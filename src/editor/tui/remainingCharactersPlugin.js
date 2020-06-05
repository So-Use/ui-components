import Editor from '@toast-ui/editor'

function findRealTextLength(node) {
    const editorContents = node.getElementsByClassName('tui-editor-contents');
    for(let i=0; i<editorContents.length; i++) {
        const current = editorContents[i];
        if (current.offsetParent) {
            return current.textContent.length + current.childNodes.length - 1;
        }
        
    }
    return 0;
}


// Step 1: Define the user plugin function
export function remainingCharactersPlugin(currentEditor) {
    const maxLength = (currentEditor.options.maxLength || 250);
    const footer = document.createElement('div');
    footer.setAttribute("class", "editor-footer")
    const remainingTextLabel = document.createElement('span')
    remainingTextLabel.setAttribute("class", "remaining-prefix")
    remainingTextLabel.innerText = "Nombre maximum de caractères conseillé : ";
    footer.appendChild(remainingTextLabel)
    const remainingTextContent = document.createElement('span')
    remainingTextContent.setAttribute("class", "remaining-content")
    remainingTextContent.innerText = maxLength;
    footer.appendChild(remainingTextContent);
    currentEditor.options.el.appendChild(footer)
    currentEditor.on('change', (event) => {
        const remainingCount = findRealTextLength(currentEditor.options.el)
        if (remainingCount > maxLength && !footer.classList.contains("error")) {
            footer.classList.add("error")
        } else if (remainingCount <= maxLength && footer.classList.contains("error")) {
            footer.classList.remove("error")
        }
        remainingTextContent.innerText = `${remainingCount} / ${maxLength}`;
    })
    currentEditor.on('load', (event) => {
        const remainingCount = findRealTextLength(currentEditor.options.el)
        if (remainingCount > maxLength && !footer.classList.contains("error")) {
            footer.classList.add("error")
        } else if (remainingCount <= maxLength && footer.classList.contains("error")) {
            footer.classList.remove("error")
        }
        remainingTextContent.innerText = `${remainingCount} / ${maxLength}`;
    })
}
