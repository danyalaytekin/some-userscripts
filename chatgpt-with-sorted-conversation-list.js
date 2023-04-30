// ==UserScript==
// @name           ChatGPT with sorted conversation list
// @description    Sort, load, sort, load, until done
// @match          https://chat.openai.com/chat*
// @downloadURL    https://raw.githubusercontent.com/danyalaytekin/some-userscripts/main/chatgpt-with-sorted-conversation-list.js
// @updateURL      https://raw.githubusercontent.com/danyalaytekin/some-userscripts/main/chatgpt-with-sorted-conversation-list.js
// @version        1.0.2
// @grant          GM.addStyle
// ==/UserScript==

GM.addStyle(`
    .spinner {
        width: 20px;
        height: 20px;
        margin: 0 auto;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #3498db;
        border-radius: 50%;
        animation: spin 2s linear infinite;
        position: absolute;
        top: 20px;
        left: 140px;
        z-index: 1000;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`);

const millisecondsBeforeFirstClick = 3000;
const millisecondsBeforeNextClicks = 1000;

const selectorsOfShame = {
    showMoreButton: '.btn.relative.btn-dark.btn-small.m-auto.mb-2',
    listOfConversations: 'nav > div > .flex.flex-col'
};

function querySelectorWithCaution(selector) {
    const itemsFound = document.querySelectorAll(selector);
    if(itemsFound.length > 1) {
        throw Error(`Expected one or zero items for selector "${ selector }" - the ChatGPT website must have changed - goodbye`);
    }
    return itemsFound.length === 1 ? itemsFound[0] : null;
}

function saySomethingIsHappening() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="spinner"></div>');
}

function sayWeAreDone() {
    querySelectorWithCaution('.spinner').remove();
}

function huntShowMoreButton() {
    const button = querySelectorWithCaution(selectorsOfShame.showMoreButton);
    
    if(button) {
        console.log('Found a "show more" button - clicking');
        button.click();
        return true;
    }
    
    console.log('No more "show more" buttons found');
    return false;
}

function sortConversations() {
    const list = querySelectorWithCaution(selectorsOfShame.listOfConversations);
    console.log(`Sorting the ${ list.children.length } conversations present...`);

    if(list) {
        [...list.children]
          .sort((a,b) => a.innerText > b.innerText ? 1 : -1)
          .forEach(node => list.appendChild(node));
    }
}

function beginNextPhase(afterWaitingFor) {
    setTimeout(() => {
        sortConversations();

        const isLoadingMoreConversations = huntShowMoreButton();
        if(isLoadingMoreConversations) {
            beginNextPhase(millisecondsBeforeNextClicks);
        }
        else {
            sayWeAreDone();

            // TODO: Do this properly for subsequent clicks
            //
            // querySelectorWithCaution(selectorsOfShame.listOfConversations).addEventListener('click', () => {
            //     console.log('Click detected');
            //     saySomethingIsHappening();
            //     beginNextPhase(millisecondsBeforeNextClicks);
            // });
        }
    }, afterWaitingFor);
}

saySomethingIsHappening();
beginNextPhase(millisecondsBeforeFirstClick);
