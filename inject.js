const clamp = ( num, min, max ) => Math.min( Math.max( num, min ), max );

const approxeq = function( v1, v2, epsilon ) {
    if ( epsilon == null ) epsilon = 0.001;
    return Math.abs(v1 - v2) < epsilon;
};

let cache = {
    board_forums: null,
}

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

function replace_invalid_head( new_title ) {
    document.head.innerHTML = `<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="ROBOTS" content="NOINDEX, FOLLOW">
	<title>${ new_title } / GameSense</title>
	<link rel="stylesheet" type="text/css" href="style/Cobalt.min.css?v=31">
	<link rel="stylesheet" type="text/css" href="/static/css/font-awesome.min.css">
	<link href="https://fonts.googleapis.com/css?family=Raleway:900,400" rel="stylesheet" type="text/css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<script src="/static/js/notifications.js?v=4" type="text/javascript" charset="UTF-8"></script>
    <style type="text/css">
        #clear__canvas, #clear__canvas2 {
            min-height: 50px;
            width: 100%;
        }
    </style>
    </head>`
}

function clear_body( ) {
    let table = document.getElementById( 'idx1' )

    if ( cache.board_forums === null ) {
        cache.board_forums = table.innerHTML
    }

    table.innerHTML = `
    <div id="idx1" class="blocktable">
        <h2><span>General</span></h2>
        <div class="box">
            <div class="inbox">
                <table>
                <thead>
                    <tr>
                        <th class="tcl" scope="col">Forum</th>
                        <th class="tcr" scope="col">Last post</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="rowodd">
                        <td class="tcl">
                            <div id="clear__canvas">

                            </div>
                        </td>
                        <td class="tcr">
                            <!-- <a href="viewtopic.php?pid=539771#p539771">Frequently asked questions</a>
                            <span class="byuser">2023-04-26 15:02:50</span>
                            <span class="byuser">by wish</span> -->

                            <div id="clear__canvas2">

                            </div>
                        </td>
                    </tr>
                    
                    
                </tbody>
                </table>
            </div>
        </div>
    </div>`;

    let table_header = table.getElementsByTagName( 'h2' )[ 0 ];
    table_header.innerText = table_header.innerText + ' ';

    let reset_a = document.createElement( 'a' );
    reset_a.href = '.';
    reset_a.innerHTML = '(reset)';

    // hover effect
    reset_a.onmouseover = ( e ) => {
        reset_a.style.textDecoration = 'underline';
        e.preventDefault( );
        return false;
    }

    reset_a.onmouseout = ( e ) => {
        reset_a.style.textDecoration = 'none';
        e.preventDefault( );
        return false;
    }

    reset_a.onclick = ( e ) => {
        table.innerHTML = cache.board_forums;
        e.preventDefault( );
        return false;
    }

    table_header.appendChild( reset_a );
}

function setup_snake_game( ) {
    let clear__canvas = document.getElementById( 'clear__canvas' );
    let canvas = document.createElement( 'canvas' );
    canvas.id = 'snake__game';
    canvas.width = clear__canvas.offsetWidth;
    canvas.height = clear__canvas.offsetWidth;
    clear__canvas.appendChild( canvas );

    let clear__canvas2 = document.getElementById( 'clear__canvas2' );
    let leaderboard = document.createElement( 'div' );
    leaderboard.id = 'snake__leaderboard';
    leaderboard.style.width = clear__canvas2.offsetWidth + 'px';
    leaderboard.style.height = '100%';
    leaderboard.style.overflow = 'auto';
    clear__canvas2.appendChild( leaderboard );

    let h2 = document.createElement( 'h2' );
    h2.innerText = 'Snake Leaderboard (to be finished kekw)';

    leaderboard.appendChild( h2 );

    let ctx = canvas.getContext( '2d' );

    let snake_size = 30;
    let snake_x = 0;
    let snake_y = 0;
    let snake_x_speed = snake_size;
    let snake_y_speed = 0;

    canvas.height = canvas.height - ( canvas.height % snake_size );
    canvas.width = canvas.width - ( canvas.width % snake_size );

    let paused = true;

    let game_state = 'Paused'

    let snake_body = [ ];
    let food_x = 0;
    let food_y = 0;
    let food_img_idx = 0;

    let score = 0;
    let high_score = chrome.storage.sync.get([ 'high_score' ], ( result ) => {
        let high_score = result[ 'high_score' ];
        return high_score ? high_score : 0;
    } );

    let update_rate = 1000 / 100;
    let last_update = 0;

    let neverlose_img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABNVBMVEUAlbkAAAAAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlbkAlblnXSCOAAAAZ3RSTlMAAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xPUFFUVllbXF5fYWJjZGVnaWtsbW5vcnN2OmcYUwAAAphJREFUeNptk9l2GlcQRfe9t0egwRKTkBgMyFhISFiAxDw0QwN9ySg7sZ04cQbn/z8hD2gpIkk91aqzH+rhbMTzQXXaksPT8x1pTye2hP8DwExddP3Pv/q9esb6h+EpLgzDzbjz9qE9XOvJyyeExzxxv5tU4obq95QRKw13g+NHgn2eXQYVC1D9ngTM4jLI779FCAEn68kRYGdePTzUsg4QH2zzsAfgxXLigV2d6fC3z1s9rzkQGaxTsAfMbnAEif6uV3wxGiby93p8DN585CAEAoq7MiRmQdGAWAzU6WKZhLw+B4HAHI0t7EGQBpTjGMDRYhLB6PoOAkFal6Gqi6DOesvVoGjASXgJZ/oMgPraw5n1DFRdTxtX492NiWytoriLJoDqDQ2yugB5fWODVd9VIKsLyLuxCXZsdW9bl18lpepPbITA7E8tmdje2tabbcJmtvnyfj7/8CVIuasrEALON97x8o9PC//dX9qn0fnp6+vrbz+24m5Q3wPVbdx78+P3N43wU7cBtt+E2jqGMRqaCIG6822cxTXUVxFADQaKnD6F8q5mgCrr15AKS8jO1AS4CqK4i7bCvN11K+WOvrfheu3hzFsAnOgCXIQnYJ3Pttv5axuSm6Ykq4uAwJ72TSLTeQKwEwkHiI0XHqq9jCIQUNF5SK38jATHBZkcb3KQDS9AIAT2aO5BerZtpt12L5JsbBY5cMd+5LEPpDc9F6KNIFz+/MsqXDc9sNph7rEwAophNwYyVrr54ePty7gEt62rkqfSytJmllOA7I4MBCozDquK57XPTPRdzpHybmhgZ1qhfyo5FMetLfS8U//mu8uWr5f16KE4e6RwO13//udm1i5F/6PefpdmdBZ41oG9/3Jdtrrq8PQ3rCZctJ3LXRIAAAAASUVORK5CYII=';
    let onetap_img = 'data:image/webp;base64,UklGRkoFAABXRUJQVlA4TD0FAAAvH8AHEPXItW3r2J77MGPbtm3btm3btpPftm3btv//+07wfu+XS3hHStu2K9uq7BO2qZxUkhrbtmwrc661fgPyKSSOAEiAEDpFkQAS2ea+CSRtofulQAJAAIxt20b11LwlJSvZi7tV23aybdu2besngCIJSI9EF0fNU7Gz8/R2fPydqN8C6YWWHfbABDpaAxKopQjI9MJIUZ1t1b7nbdIumZd8Tb6SpWQsxep/t/gkbwcC0A+QxAwgKAJtZXSqavyLv2QrvUVFnMQfAsAJlKRbyNgkWRrGH1Xto6M5IJDU70D0HhOvkzapm8HiDHQAwOs24iy+oGvMYEiSvElTpuppCLptIROJTqP0JlYpmcwAa7lMA8RQEBahZEwwgUhYrggFQtwyPr2koR0JQK54OpeoKRHkYKwMTqYn1w8CBIEb+IurIOJBVZKhSbxI6iwgh5EXxlRski38hw58i7EUaRYkAQYPHkRE9ATfQ0jiNqxLpcYTYxkAEsXTyThL68T0mC4JG9an3NYVJL5uCppHteY513JezE59IALU94yPcZd5YHiMNeef1wnBwACtQe2oHFiekrmJ0fRIHwENRKHoUbX9z1qUYC50NCVD3mZk4g2M/uodfST5MtCkXqrH/zB0J/LA2EJN6SBytJX5oAxSYgXXGaHXIXk0FtHjdbHijeFEThifp8nZ1EqmgC0sD4PPSNYdxsHqzYUbD4whctG4AiXGMlT0Dh9YjqRpEHgYHb2Arylb/DCQYIsZFmZcKgSVQ4loHWZHwEEmBKyOI8qH4lGwKd/4YxgBIEpaB78MlFlQLikXxoMBBANePIi4PEwwHExhFJQKlRJ+6CrJF22tA4QsAQjW19q0pW24VjaJ+pzkrxkED4PABWwA0QLcTOhhefQ0Cd4k1ktqJsZH/SRdY4SVgKAlKEC7XuljwkUQqiSZ3iT3t4n/yKhD/9A55plVD+fIhlODjlhvk/775H+koZkpsZY+6QOgDUUIiFDVjqvNw5UYSf7Pw/1pEj/SNwgd7RMvcDTtRRi6JvEe4fyYXD8m4XOGSo0mUVGzrYBwIhraiaWbO0ckOlBK4jwS/eew/T/eDxO/adCEQxBUaU7zvA/b7+P7NfHfpSroQb+QYpHUdRraEABSxdOFrGVs4gR+YAf9TJGXpHkkwyuNGltQkadmpnaT7jVpHyn+JkPBGdbv659kXCTTOUAKAX+6lKiRE5osx+uBh9vhbmhgJKmarI2tRIA7uEHQcR2/XF8gcRchXSCgvGxkk/Qn2/LY26hKz9CmkZRIwK6B5Slsy/AEw0AgaR2Oa4sP3E67NG+/fTCMIgTE2NjMVvEr45KvybREWZ7WaRQE2ySfojT9A4pIjSbGkmDJXvIu/1u3X/aYAogmoh742gBZHeTXWX3b1zZ+ZmpsjImgkjQNzYI+0MFYTOX/VL3Ww5b5cV4mHfLFAEAURfIIIBbQqmt8ybB4AuJyV3AXGiBaQ5plTlwDZAMSjlBM0tG5afsbdenU6ICvHEQ86C0KcirKMk7PAWUU04AC/nT7av0mc8nR1Gl6Jz2T2s2ywqVik7Ex1EZABHOAlNm6XLIISa0m8cK1sCzsS5SScWkXBKVQo2srtzAHyJqkO5mbrEurZkCo3VRt2oeBYWBSJ+Qu2RtVbQCEMAdIEtD5aEvepkCTq8nZVGtKNHmaP8WbtzuNbAnF/BYLzS3W8Ou+K+aI6cgE3R2cng9JzybHLTnt8rVFPeJLg/QvCH2XAkVHrZY9stPi04A4QCGgBlANyANEAlKN7IwxDgLSSAAA'
    let primordial_img = ' data:image/webp;base64,UklGRsYCAABXRUJQVlA4TLkCAAAvH8AHEC/mIJIkRcrZcXX+VZwPpn4w4bhtG0Givdjv9V/atXG4f+ygjSRHco8OzPFnczw+h2nIsW2riu4+976L20wTgNAIjyG5wKjd3fu9hM3f6x1/+MUvPvGHH1RUU6O/+A6JiDYIjgQADgd/OBwFCeAQgACAAARBAMDh4A9BcBR0kAgAABwCAKALIAAH6AOAgACAIxEQRhAKQIFDAEAIACAIgQBwgARwJIDgAEAAAlmPnXki30kfi5fn9io6vO//dN3/nZ6Ld3J23neWqY/9i/YxHZL7vgbe9fTsP13uTZ5s6Uj0n7UFiy0IhPkOL9ZGfxOL7jGtKORrNIM02+4kSDTMoqWS2ei8t3F0qlMqSU/mY6pOFE1QYhIrTFiwEits+d8Omafr99idft2Q1ldz/966Zm36r/3p99hMn3NPrMLICRJs2zbt6MS27R3btm3btlG2bZvfZQYty8s7d6QFEf2fADrEWb1d2SFEwRnt/bkiQtsCO6JIMqIlsDuc14MmktmAoRBOMRZI9gTKOCNokFeNSY4HyuQVwovjiFV59XDj9MCM/n2XMYdhTh62Ny6+/Prg+p27t+99W99GMYe6oX/0mlKnUii0z08bYojYkVMwPvHwo0qhfnXOAovRPIqdh8nxq+81z85a7tglkciEGRgdufTojPm2TTKJjRqD3uaWASbjSHRYZ8DOblBfJIlPdAY8U0h8phNcnOCeL6zEG6OJMYPwKRNU7o+OECJqRlCtkPIAtJJkI1ArIM8PA3RgFwKLWFEOsI08KHQWbvGcGvjnkMw0XzRwRjFOsocwzfFAg8TvvxJV8OLYo0Li/puf+4rgymlH076bn7Svb/34RWsY4KT67h37c+OLQqlQqT78J9OAdA5VYunCC7VOpdJ+fny+F3XEL7BaPnXl6dt3Ty6fXLEupcMLAA==';

    let food_images = [
        new Image( snake_size, snake_size ),
        new Image( snake_size, snake_size ),
        new Image( snake_size, snake_size ),
    ]

    food_images[ 0 ].src = neverlose_img;
    food_images[ 1 ].src = onetap_img;
    food_images[ 2 ].src = primordial_img;

    function gen_new_food( ) {
        food_x = Math.floor( Math.random( ) * ( canvas.width / snake_size ) ) * snake_size;
        food_y = Math.floor( Math.random( ) * ( canvas.height / snake_size ) ) * snake_size;
        food_img_idx = Math.floor( Math.random( ) * food_images.length );
    }

    function handle_snake( ) {
        if ( paused ) return;

        
        snake_x += snake_x_speed;
        snake_y += snake_y_speed;

        if ( snake_x < 0 ) {
            snake_x = canvas.width - snake_size;
        } else if ( snake_x >= canvas.width ) {
            snake_x = 0;
        }

        if ( snake_y < 0 ) {
            snake_y = canvas.height - snake_size;
        } else if ( snake_y >= canvas.height ) {
            snake_y = 0;
        }

        snake_x = snake_x - ( snake_x % snake_size );
        snake_y = snake_y - ( snake_y % snake_size );
    }

    gen_new_food( );

    function snake_run( ) {
        handle_snake( );

        let now = Date.now( );
        let delta = now - last_update;

        if ( delta < update_rate ) {
            return;
        }

        ctx.fillStyle = 'black';
        ctx.fillRect( 0, 0, canvas.width, canvas.height );

        ctx.fillStyle = 'lime';
        for ( let i = 0; i < snake_body.length; i++ ) {
            ctx.fillRect( snake_body[ i ].x, snake_body[ i ].y, snake_size, snake_size );

            if ( snake_body[ i ].x === snake_x && snake_body[ i ].y === snake_y ) {
                snake_body = [ ];
                snake_x = 0;
                snake_y = 0;
                snake_x_speed = snake_size;
                snake_y_speed = 0;
                score = 0;
                paused = true;
                game_state = 'Game Over. (Paused)';
            }
        }

        snake_body.push( { x: snake_x, y: snake_y } );

        while ( snake_body.length > score + 1 ) {
            snake_body.shift( );
        }

        ctx.drawImage( food_images[ food_img_idx ], food_x, food_y, snake_size, snake_size );

        if ( snake_x === food_x && snake_y === food_y ) {
            gen_new_food( );
            score++;
        }

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText( `Nonames eaten: ${ score }`, 10, 30 );
        ctx.fillText( `High Score: ${ high_score }`, 10, 60 );
        ctx.fillText( `${ game_state }`, 10, 90 );

        if ( score > high_score ) {
            high_score = score;
            chrome.storage.sync.set( { high_score: high_score } );
        }
    }

    window.addEventListener( 'keydown', ( e ) => {
        switch ( e.key ) {
            case 'ArrowLeft':
                if ( snake_x_speed !== snake_size ) {
                    snake_x_speed = -snake_size;
                    snake_y_speed = 0;
                }
                break;
            case 'ArrowUp':
                if ( snake_y_speed !== snake_size ) {
                    snake_x_speed = 0;
                    snake_y_speed = -snake_size;
                }
                break;
            case 'ArrowRight':
                if ( snake_x_speed !== -snake_size ) {
                    snake_x_speed = snake_size;
                    snake_y_speed = 0;
                }
                break;
            case 'ArrowDown':
                if ( snake_y_speed !== -snake_size ) {
                    snake_x_speed = 0;
                    snake_y_speed = snake_size;
                }
                break;
            case ' ':
                paused = !paused;
                game_state = paused ? 'Paused' : 'Running';
                break;
        }
    } );

    setInterval( snake_run, 1000 / 30 );
}

function snake_game( ) {
    let brdwelcome = document.getElementById( 'brdwelcome' );

    if ( brdwelcome.innerText === 'You are not logged in.' ) {
        return;
    }

    replace_invalid_head( 'Snake Game' );
    clear_body( );

    setup_snake_game( );
}

function add_snake_to_brdmenu( ) {
    let url = window.location.href;

    if ( !url.endsWith( '/forums/index.php' ) ) return;

    let brdmenu = document.getElementById( 'brdmenu' );
    let ul = brdmenu.getElementsByTagName( 'ul' )[ 0 ];

    let new_li = document.createElement( 'li' );
    new_li.id = 'navbuy';

    let snake_a = document.createElement( 'a' );
    snake_a.href = '.';
    snake_a.innerHTML = 'Snake Game';
    snake_a.classList.add( 'usergroup-1' );

    snake_a.addEventListener( 'click', ( e ) => {
        e.preventDefault( );
        e.stopImmediatePropagation( );

        snake_game( );

        return false;
    }, true );

    new_li.appendChild( snake_a );
    ul.insertBefore( new_li, ul.children[ ul.children.length - 1 ] );
}

chrome.storage.sync.get( [ 'show_uid' ], ( result ) => { 
    let enabled = result[ 'show_uid' ] ? result[ 'show_uid' ] !== 'none' : false;

    show_status_message( 'User ID Reveal: ', enabled ? 'enabled' : 'disabled', enabled );
    if ( enabled  ) reveal_member_uids( );
} );

chrome.storage.sync.get([ 'custom_logo' ], ( result ) => {
    let enabled = result[ 'custom_logo' ] ? result[ 'custom_logo' ] !== 'none' : false;

    show_status_message( 'Custom Logo: ', enabled ? 'enabled' : 'disabled', enabled );
    if ( enabled ) switch_to_custom_logo( );
} );

chrome.storage.sync.get([ 'hide_username' ], ( result ) => {
    let enabled = result[ 'hide_username' ] ? result[ 'hide_username' ] !== 'none' : false;
    
    chrome.storage.sync.get([ 'custom_username_string' ], ( result ) => {
        show_status_message( 'Hide Username: ', enabled ? result[ 'custom_username_string' ] : 'disabled', enabled );
    } );

    if ( enabled ) hide_username( );
} );

chrome.storage.sync.get([ 'snake_minigame' ], ( result ) => {
    let enabled = result[ 'snake_minigame' ] ? result[ 'snake_minigame' ] !== 'none' : false;

    show_status_message( 'Snake Game: ', enabled ? 'enabled' : 'disabled', enabled );
    if ( enabled ) add_snake_to_brdmenu( );
} );