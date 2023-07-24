// Todo: Add cool startup message
function show_startup_message( ) {
    const message = `%cWEAK DOGS ONLY USE ALWAYSLOSS.CC... STRONG MEN USE GAMESENSICAL.PUBS (◣_◢)`;

    const messagestyle = `
        font-family: Impact, Charcoal, sans-serif;
        font-size: 22px;
        letter-spacing: 1px;
        word-spacing: 2px;
        color: #95A715;
        font-weight: 400;
        text-decoration: rgb(68, 68, 68);
        font-style: normal;
        font-variant: small-caps;
        text-transform: none;
    `;

    console.log( message, messagestyle );
}
show_startup_message( );

function show_status_message( message, status, on_off ) {
    const statusstyle = `
        font-family: Verdana, Geneva, sans-serif;
        font-size: 13px;
        letter-spacing: 0px;
        word-spacing: 0px;
        color: #AFAFAF;
        font-weight: 400;
        text-decoration: rgb(68, 68, 68);
        font-style: normal;
        font-variant: normal;
        text-transform: none;
    `;

    const on_off_style = statusstyle + `
        color: ${ on_off ? '#00FF00' : '#FF0000' };
    `;

    console.log( `%c${ message }`+`%c${ status }`, statusstyle, on_off_style );
}


function reveal_member_uids( ) {
    let posts = document.getElementsByClassName( 'blockpost' );

    for ( let i = 0; i < posts.length; i++ ) {
        let post = posts[ i ];

        if ( post.classList.contains( 'liker' ) ) continue;

        let left_box = post.getElementsByClassName( 'postleft' )[ 0 ];

        let links = left_box.getElementsByTagName( 'a' ) || [ ];

        let pm_link = links[ 0 ];
        for ( let link of links ) {
            if ( link.innerHTML === 'PM' ) {
                pm_link = link;
                break;
            }
        }

        // href="pmsnew.php?mdl=post&uid=1699" get uid
        let uid = pm_link.href.match( /uid=(\d+)/ )[ 1 ];

        let uid_dd = document.createElement( 'dd' );
        uid_dd.classList.add( 'member__uid' );
        let uid_span = document.createElement( 'span' );
        uid_span.innerHTML = ` User ID: ${ uid }`;

        uid_dd.appendChild( uid_span );

        let usercontacts = left_box.getElementsByClassName( 'usercontacts' )[ 0 ];

        // append before usercontacts
        usercontacts.parentNode.insertBefore( uid_dd, usercontacts );
    }
}

function switch_to_custom_logo( ) {
    let header = document.getElementById( 'brdtitle' )

    header.children.item( 0 ).remove( )

    let a = document.createElement( 'a' )
    a.href = '.'

    let img = document.createElement( 'img' )
    img.id = 'logo'
    img.src = 'https://shibe.host/%E2%80%8B%E2%81%A0%E2%81%A0%E2%80%8B%E2%80%8B%E2%80%8C%E2%80%8C%E2%80%8B%E2%80%8D%E2%80%8B%E2%80%8C%E2%80%8B/direct'
    img.style.maxHeight = '35px'

    a.append( img )

    header.append( a )
}

function hide_username( ) {
    let username = document.getElementById( 'brdwelcome' ).getElementsByTagName( 'strong' )[ 0 ]

    function replace_string_in_dom( find, replace ) {
        const walk = ( node ) => {
            if ( node.nodeType === Node.TEXT_NODE ) {
                node.textContent = node.textContent.replace( new RegExp( find, 'g' ), replace );
            } else if ( node.nodeType === Node.ELEMENT_NODE ) {
                for ( const childNode of node.childNodes ) {
                    walk( childNode );
                }
            }
        };
      
        walk( document.body );
    }
      
    chrome.storage.sync.get([ 'custom_username_string' ], ( result ) => {
        if ( result[ 'custom_username_string' ] !== 'none' ) {
            replace_string_in_dom( username.innerHTML, result[ 'custom_username_string' ] )
        }
    } );
}

chrome.storage.sync.get( [ 'show_uid' ], ( result ) => { 
    let enabled = result[ 'show_uid' ] !== 'none';

    show_status_message( 'User ID Reveal: ', enabled ? 'enabled' : 'disabled', enabled );
    if ( enabled  ) reveal_member_uids( );
} );

chrome.storage.sync.get([ 'custom_logo' ], ( result ) => {
    let enabled = result[ 'custom_logo' ] !== 'none';

    show_status_message( 'Custom Logo: ', enabled ? 'enabled' : 'disabled', enabled );
    if ( enabled ) switch_to_custom_logo( );
} );

chrome.storage.sync.get([ 'hide_username' ], ( result ) => {
    let enabled = result[ 'hide_username' ] !== 'none';
    
    chrome.storage.sync.get([ 'custom_username_string' ], ( result ) => {
        show_status_message( 'Hide Username: ', enabled ? result[ 'custom_username_string' ] : 'disabled', enabled );
    } );

    if ( enabled ) hide_username( );
} );