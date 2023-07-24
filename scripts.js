const reveal_uid = document.getElementById( 'reveal__member__uid' );
const custom_logo = document.getElementById( 'custom__header__image' );
const hide_username = document.getElementById( 'hide__username' );
const custom_username_string = document.getElementById( 'custom__username' );

function restoreOptions( ) {
    chrome.storage.sync.get({ 'show_uid' : 'none'}, function (result) {
        reveal_uid.checked = result[ 'show_uid' ] == 'none' ? false : true;
    });

    chrome.storage.sync.get({ 'custom_logo' : 'none'}, function (result) {
        custom_logo.checked = result[ 'custom_logo' ] == 'none' ? false : true;
    } );

    chrome.storage.sync.get({ 'hide_username' : 'none'}, function (result) {
        hide_username.checked = result[ 'hide_username' ] == 'none' ? false : true;

        // This funky bit of code is to make sure the custom username string is hidden when the hide username option is not selected
        let feature_row = custom_username_string.parentElement.parentElement;
        feature_row.style.display = hide_username.checked ? 'flex' : 'none';
        hide_username.addEventListener( 'change', ( ) => {
            feature_row.style.display = hide_username.checked ? 'flex' : 'none';
        } );
    } );

    chrome.storage.sync.get({ 'custom_username_string' : 'none'}, function (result) {
        custom_username_string.value = result[ 'custom_username_string' ];
    } );
}

restoreOptions();


reveal_uid.addEventListener('click', ( ) => {
    let new_state = reveal_uid.checked ? 'show_uid' : 'none';
    chrome.storage.sync.set({ 'show_uid' : new_state }, ( ) => { } );
} );

custom_logo.addEventListener('click', ( ) => {
    let new_state = custom_logo.checked ? 'custom_logo' : 'none';
    chrome.storage.sync.set({ 'custom_logo' : new_state }, ( ) => { } );
} );

hide_username.addEventListener('click', ( ) => {
    let new_state = hide_username.checked ? 'hide_username' : 'none';
    chrome.storage.sync.set({ 'hide_username' : new_state }, ( ) => { } );
} );

custom_username_string.addEventListener('change', ( ) => {
    chrome.storage.sync.set({ 'custom_username_string' : custom_username_string.value }, ( ) => { } );
} );