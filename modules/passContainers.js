class PassContainers{

    constructor(){
        this.cons = []
    }


    add(nm, passwd){

        let date = Date.now();

        let obj = {
            id: this.cons.length,
            name: nm,
            password: passwd,
            last_open: date,
            count: 0,
            locked: false, 
            passwords: [],
            crypto_string: '',
            no_key: true,
            dateConvert: this.dateConvert,
            changeConvert: this.changeConvert
        }

        this.cons.push(obj);
    }


    getAll(){ return this.cons; }
    getIndex(i) { return this.cons[i]; }
    len() { return this.cons.length; }


    dateConvert(d){

        let str = '';
        let date = new Date(d);

        let mins = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
        let month = date.getMonth().length > 1 ? date.getMonth() : '0' + (date.getMonth() + 1);

        str = date.getHours() + ':' + mins + '  |  ' + date.getDate() + '.' + month + '.' + date.getFullYear();

        return str;
    }

    initAfterLoad(){

        for(let i=0; i<this.cons.length; i++){
            this.cons[i].dateConvert = this.dateConvert;
            this.cons[i].changeConvert = this.changeConvert;
        }
    }

    changeConvert(d){

        let str = '';
        let date = new Date(d);

        str = date.getDate() + '.' + (date.getMonth().length > 1 ? date.getMonth() : '0' + (date.getMonth() + 1)) + '.' + date.getFullYear();

        return str;
    }

    addPassword(conID, tit, pass){

        let id = this.cons[conID].passwords.length;
        let title = tit;
        let pass_val = pass;
        let editDate = Date.now();

        let password_card = {id: id, title: title, pass_val: pass_val, editDate: editDate}

        this.cons[conID].passwords.push(password_card);
        this.cons[conID].count = this.cons[conID].passwords.length;
    }

    editPassword(conID, id, pass){ this.cons[conID].passwords[id].pass_val = pass; }

    deletePassword(conID, id){

        this.cons[conID].passwords.splice(id, 1);
        for(let i=0; i<this.cons[conID].passwords.length; i++) this.cons[conID].passwords[i].id = i;
        this.cons[conID].count = this.cons[conID].passwords.length;
    }

    deleteContainer(conID){

        this.cons.splice(conID, 1);
        for(let i=0; i<this.cons.length; i++) this.cons[i].id = i;
    }

    applyDecoded(conID, passwords){ 

        this.cons[conID].crypto_string = ''; 
        this.cons[conID].locked = false;
        this.cons[conID].passwords = passwords; 
    }
}


module.exports = PassContainers;