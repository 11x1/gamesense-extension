// Todo: Add cool startup message

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

console.log( 'Hello from inject.js' );
chrome.storage.sync.get( [ 'show_uid' ], ( result ) => { 
    if ( result[ 'show_uid' ] == 'show_uid' ) {
        reveal_member_uids( );
    }
} );

chrome.storage.sync.get([ 'custom_logo' ], ( result ) => {
    if ( result[ 'custom_logo' ] == 'custom_logo' ) {
        switch_to_custom_logo( );
    }
} );

chrome.storage.sync.get([ 'hide_username' ], ( result ) => {
    if ( result[ 'hide_username' ] == 'hide_username' ) {
        hide_username( );
    }
} );