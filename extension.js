const vscode = require("vscode");

function words(text) {
    return text
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .trim()
        .split(/\s+/);
}

function camelCase(text) {
    const w = words(text);
    return w
        .map((x, i) =>
            i === 0
                ? x.toLowerCase()
                : x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()
        )
        .join("");
}

function pascalCase(text) {
    return words(text)
        .map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
        .join("");
}

function snakeCase(text) {
    return words(text)
        .map(x => x.toLowerCase())
        .join("_");
}

function kebabCase(text) {
    return words(text)
        .map(x => x.toLowerCase())
        .join("-");
}

function titleCase(text) {
    return words(text)
        .map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
        .join(" ");
}

function sentenceCase(text) {
    text = text.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
}

async function replaceSelected(converter) {

    const editor = vscode.window.activeTextEditor;

    if (!editor) return;

    await editor.edit(editBuilder => {

        editor.selections.forEach(selection => {

            const text = editor.document.getText(selection);

            editBuilder.replace(
                selection,
                converter(text)
            );

        });

    });

}

function activate(context) {

    context.subscriptions.push(

        vscode.commands.registerCommand(
            "caseConverter.upper",
            () => replaceSelected(t => t.toUpperCase())
        ),

        vscode.commands.registerCommand(
            "caseConverter.lower",
            () => replaceSelected(t => t.toLowerCase())
        ),

        vscode.commands.registerCommand(
            "caseConverter.camel",
            () => replaceSelected(camelCase)
        ),

        vscode.commands.registerCommand(
            "caseConverter.pascal",
            () => replaceSelected(pascalCase)
        ),

        vscode.commands.registerCommand(
            "caseConverter.snake",
            () => replaceSelected(snakeCase)
        ),

        vscode.commands.registerCommand(
            "caseConverter.kebab",
            () => replaceSelected(kebabCase)
        ),

        vscode.commands.registerCommand(
            "caseConverter.title",
            () => replaceSelected(titleCase)
        ),

        vscode.commands.registerCommand(
            "caseConverter.sentence",
            () => replaceSelected(sentenceCase)
        )

    );

}

exports.activate = activate;

function deactivate() {}

module.exports = {
    activate,
    deactivate
};