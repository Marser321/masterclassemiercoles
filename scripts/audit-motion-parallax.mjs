#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const scanRoots = ["src/components", "src/app", "src/lib"]
    .map((item) => path.join(root, item));
const allowedExtensions = new Set([".tsx", ".ts", ".jsx", ".js"]);
const findings = [];

function walk(dir) {
    let entries = [];
    try {
        entries = readdirSync(dir);
    } catch {
        return [];
    }

    return entries.flatMap((entry) => {
        const fullPath = path.join(dir, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) return walk(fullPath);
        if (!allowedExtensions.has(path.extname(entry))) return [];
        return [fullPath];
    });
}

function lineFor(source, index) {
    return source.slice(0, index).split("\n").length;
}

function add(file, source, index, message) {
    findings.push({
        file: path.relative(root, file),
        line: lineFor(source, index),
        message,
    });
}

function findMotionBlocks(source) {
    const blocks = [];
    const tagPattern = /<motion\.[a-zA-Z0-9]+/g;
    let match;

    while ((match = tagPattern.exec(source))) {
        const start = match.index;
        let cursor = tagPattern.lastIndex;
        let depth = 0;
        let quote = null;
        let end = -1;

        for (; cursor < source.length; cursor++) {
            const char = source[cursor];
            const prev = source[cursor - 1];

            if (quote) {
                if (char === quote && prev !== "\\") quote = null;
                continue;
            }

            if (char === "\"" || char === "'" || char === "`") {
                quote = char;
                continue;
            }

            if (char === "{") depth++;
            if (char === "}") depth = Math.max(0, depth - 1);
            if (char === ">" && depth === 0) {
                end = cursor + 1;
                break;
            }
        }

        if (end > start) {
            blocks.push({ start, text: source.slice(start, end) });
            tagPattern.lastIndex = end;
        }
    }

    return blocks;
}

function hasStyleYAndAnimateY(block) {
    return /style\s*=\s*\{\{[\s\S]*?\by\s*:/m.test(block)
        && /animate\s*=\s*\{\{[\s\S]*?\by\s*:/m.test(block);
}

function hasHeavyBlur(block) {
    const blurPattern = /blur\((\d+(?:\.\d+)?)px\)|blur-\[(\d+(?:\.\d+)?)px\]/g;
    let match;
    while ((match = blurPattern.exec(block))) {
        const value = Number(match[1] || match[2]);
        if (value >= 120) return true;
    }
    return false;
}

function isDecorativeBackground(file, block) {
    const name = path.basename(file).toLowerCase();
    return /background|parallax|floating|aurora/.test(name)
        || /data-motion-audit|floating-icon|texture-|aurora|parallax/i.test(block);
}

function auditFile(file) {
    const source = readFileSync(file, "utf8");
    const usesReducedMotion = /useReducedMotion|prefers-reduced-motion/.test(source);
    const blocks = findMotionBlocks(source);

    for (const block of blocks) {
        if (hasStyleYAndAnimateY(block.text)) {
            add(
                file,
                source,
                block.start,
                "Do not animate `y` from both scroll-linked `style` and `animate` on the same motion element."
            );
        }

        if (/repeat\s*:\s*Infinity/.test(block.text) && hasHeavyBlur(block.text)) {
            add(
                file,
                source,
                block.start,
                "Avoid heavy blur on infinitely animated background layers; it can trigger repaint flicker."
            );
        }

        if (/repeat\s*:\s*Infinity/.test(block.text) && isDecorativeBackground(file, block.text) && !usesReducedMotion) {
            add(
                file,
                source,
                block.start,
                "Infinite decorative background motion must respect reduced motion."
            );
        }

        if (
            isDecorativeBackground(file, block.text)
            && /className\s*=\s*["'][^"']*(absolute|fixed|inset-0)/.test(block.text)
            && !/pointer-events-none/.test(block.text)
        ) {
            add(
                file,
                source,
                block.start,
                "Absolute/fixed background motion layers should include `pointer-events-none`."
            );
        }
    }
}

for (const file of scanRoots.flatMap(walk)) {
    auditFile(file);
}

if (findings.length > 0) {
    console.error("Motion/parallax audit failed:\n");
    for (const finding of findings) {
        console.error(`- ${finding.file}:${finding.line} ${finding.message}`);
    }
    process.exit(1);
}

console.log("Motion/parallax static audit passed.");
