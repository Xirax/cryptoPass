const fs = require('fs');
const CryptoJS = require('crypto-js');

const mkdirp = require('mkdirp');

class LockManager{

    constructor(){
        this.secret_keys = [];
    }

    async saveToFile(fname, cons=[]){

        let containers = JSON.parse(JSON.stringify(cons));

        for(let i=0; i<containers.length; i++) this.encodeContainer(containers[i]);
         
        let str = JSON.stringify(containers);  

        fs.writeFile(fname, str, function (err) { if (err) return console.log(err); });
    }

    async loadFromFile(fname){

        if(!fs.existsSync(fname)) {
            await mkdirp('./dat');
            fs.writeFile(fname, '', function(err){ if(err) return console.log(err); })
        }

        return new Promise(resolve => {
            fs.readFile(fname, (err, data) => { 

                if(err) resolve(err); 
                else if(data == '') resolve([]);
                else  resolve(JSON.parse(data));
            });  
        })

    }


    encodeContainer(con){

        let key = this.hashPassword(this.hashPassword(con.password));

        let code = CryptoJS.AES.encrypt(JSON.stringify(con.passwords), key);

        con.passwords = [];
        con.locked = true;
        con.password = '';
        con.crypto_string = code.toString();
    }

    decodeContainer(con, pass){

        let key = this.hashPassword(this.hashPassword(pass));
        let data = CryptoJS.AES.decrypt(con.crypto_string, key);

        try{

            let ready_json = JSON.parse(data.toString(CryptoJS.enc.Utf8));

            con.password = pass;


            return ready_json;
        }
        catch{
            return [];
        }  
    }


    hashPassword(pass){

        let hash = '';


        // Here is password hashing code to make encoding stronger and I want to keep it secret ;)


        return hash;
    }
}

module.exports = LockManager;