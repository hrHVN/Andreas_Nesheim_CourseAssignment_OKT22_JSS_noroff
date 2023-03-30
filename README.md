# JavaScript Server - Course assessment 1

## Eksternal Librarys used
# Crypto
    https://nodejs.org/api/crypto.html#crypto
    https://www.youtube.com/watch?v=heldAl8Cfr4
# Seesion storage    
https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

## Krav 
    - NodeJS
    - Express - http://expressjs.com/en/api.html#app
    - Ejs
    - Bootstrap 5.2.3
    - PassportJS - https://www.passportjs.org/
    - express-session - https://www.npmjs.com/package/express-session
    - express-session-json - https://www.npmjs.com/package/express-session-json

## Generelle ikkje så generelle mål
1 - fikse error og dårlig kode
2 - karlegge progresjon
3 - fullføre sida

## klient brief
# hoved side 
    - "meme overview page" <table id='memes'>

# Demo api gir 100stk -> https://api.imgflip.com/get_memes
    - Api 
        - max 1 get per 'session'
            - lagres i eit <object>
    - Lagres i eit <.env>
    - {
        "data": {
            "memes": [
                {
                    "id": "181913649",
                    "name": "Drake Hotline Bling",
                    "url": "https:\/\/i.imgflip.com\/30b1gx.jpg",
                    "width": 1200,
                    "height": 1200,
                    "box_count": 2,
                    "captions": 0
                }
            ]
        }
    }

# table row 
    - meme-thumbnail<20%>
    - navn
    - dimensjoner <w,h>
    - knapp <'Details'>
        - <id, url, img, navn, dimmejsoner>
        - når besøkt <ny bg farge>
        - Må bruke JS-funksjon med <POST> til å opne rett url

# Søke funksjon
    - søker etter frase når knappen blir brukt

# Innlogging
    - nav:login -<login.ejs>
    - gjeste brukarar:
        - ingen <detaljer om gif>
        - hvis bruker følger url til detaljer -> redirect ->loginn
    - innllogga:
        - <suksess>:redirect -> index
        - <detaljer om gif>
        - Hardkoda brukarar
            - Josh, Josh1
            - FJ, FJ1
            - Student, Student1
    - PassportJS
        - Ekstern <users.json> med min 3 brukarar
    - express-session
    - express-session-json

# Navigasjon
    - Logo
        - redirect -> index
    - Login 
        - Logut
        - bruker navn
# readme
    - Eksterne biliotek som ikkje er nevnt over

##  Kart
    - <Memes overview>
    - <Meme detail>
    - <Login>






