var crudApp = new function () {

    // AN ARRAY OF JSON OBJECTS WITH VALUES.
    this.Storage = [     
        ]
    

    this.category = ['Music', 'Book', 'Food', 'Medicine','Other'];
    this.col = ['ID', 'Quantity','Items', 'Category', 'Price', 'Tax', 'Tax_included'];
    


    this.createTable = function () {

        // EXTRACT VALUE FOR TABLE HEADER.
        for (var i = 0; i < this.Storage.length; i++) {
            for (var key in this.Storage[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }

        // CREATE A TABLE.
        var table = document.createElement('table');
        table.setAttribute('id', 'storageRoom');     // SET TABLE ID.

        var tr = table.insertRow(-1);               // CREATE A ROW (FOR HEADER).

        for (var h = 0; h < this.col.length; h++) {
            // ADD TABLE HEADER.
            var th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }

        // ADD ROWS USING JSON DATA.
        for (var i = 0; i < this.Storage.length; i++) {
            

            tr = table.insertRow(-1);           // CREATE A NEW ROW.

            for (var j = 0; j < this.col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.Storage[i][this.col[j]];
            }

            // DYNAMICALLY CREATE AND ADD ELEMENTS TO TABLE CELLS WITH EVENTS.

            this.td = document.createElement('td');
            
            
            // *** CANCEL OPTION.
            tr.appendChild(this.td);
            var lblCancel = document.createElement('label');
            lblCancel.innerHTML = '✖';
            lblCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
            lblCancel.setAttribute('style', 'display:none;');
            lblCancel.setAttribute('title', 'Cancel');
            lblCancel.setAttribute('id', 'lbl' + i);
            this.td.appendChild(lblCancel);

            // *** SAVE.
            tr.appendChild(this.td);
            var btSave = document.createElement('input');

            btSave.setAttribute('type', 'button');      // SET ATTRIBUTES.
            btSave.setAttribute('value', 'Save');
            btSave.setAttribute('id', 'Save' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'crudApp.Save(this)');       // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btSave);

            // *** UPDATE.
            tr.appendChild(this.td);
            var btUpdate = document.createElement('input');

            btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
            btUpdate.setAttribute('value', 'Update');
            btUpdate.setAttribute('id', 'Edit' + i);
            btUpdate.setAttribute('style', 'background-color:#44CCEB;');
            btUpdate.setAttribute('onclick', 'crudApp.Update(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btUpdate);
            

            // *** DELETE.
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            var btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
            btDelete.setAttribute('value', 'Delete');
            btDelete.setAttribute('style', 'background-color:#ED5650;');
            btDelete.setAttribute('onclick', 'crudApp.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btDelete);

            
            
        }


        // ADD A ROW AT THE END WITH BLANK TEXTBOXES AND A DROPDOWN LIST (FOR NEW ENTRY).

        tr = table.insertRow(-1);           // CREATE THE LAST ROW.

        for (var j = 0; j < 7; j++) {
            var newCell = tr.insertCell(-1);
            if (j > 1 && j < 5) {

                if (j == 3 ) {   // WE'LL ADD A DROPDOWN LIST AT THE SECOND COLUMN (FOR Category).

                    var select = document.createElement('select');      // CREATE AND ADD A DROPDOWN LIST.
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < this.category.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                    }
                    newCell.appendChild(select);
                }

                else {
                    var tBox = document.createElement('input');          // CREATE AND ADD A TEXTBOX.
                    tBox.setAttribute('type', 'text');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox);
                }
            }
        }

        
        this.td = document.createElement('td');
        tr.appendChild(this.td);

        var btNew = document.createElement('input');

        btNew.setAttribute('type', 'button');       // SET ATTRIBUTES.
        btNew.setAttribute('value', 'Create');
        btNew.setAttribute('id', 'New' + i);
        btNew.setAttribute('style', 'background-color:#207DD1;');
        btNew.setAttribute('onclick', 'crudApp.CreateNew(this)');       // ADD THE BUTTON's 'onclick' EVENT.
        this.td.appendChild(btNew);


        // TOTAL 
        
        var tr = table.insertRow(-1);
        for (var j = 0; j < 5; j++) {
            var newCell = tr.insertCell(-1);
            if (j > 0 && j < 3) {
                if (j == 1 ) {   // TOTAL TAX
                    var tax_count = 0;
                    var th = document.createElement('th');                 
                    for (i = 0; i < this.Storage.length; i++) {
                        tax_count = tax_count + this.Storage[i].Tax;
                    }         
                    tax_count = tax_count.toFixed(2);
                    th.innerHTML = "Total Tax: "+ tax_count;
                    tr.appendChild(th);
                }

                else if (j == 2){ //TOTAL PRICE
                    var price_count = 0;
                    var th = document.createElement('th');
                    for (i = 0; i < this.Storage.length; i++) {
                        price_count = price_count + this.Storage[i].Tax_included;
                    }       
                    price_count = price_count.toFixed(2);
                    th.innerHTML = "Subtotal: "+price_count;
                    tr.appendChild(th);
                }
            }
        }


        var div = document.getElementById('container');
        div.innerHTML = '';
        

        div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
    };
    
    // ****** OPERATIONS START.

    // CANCEL.
    this.Cancel = function (oButton) {

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none; float:none;');

        var activeRow = oButton.parentNode.parentNode.rowIndex;

        // HIDE THE SAVE BUTTON.
        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        // SHOW THE UPDATE BUTTON AGAIN.
        var btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        var tab = document.getElementById('storageRoom').rows[activeRow];

        for (i = 0; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.Storage[(activeRow - 1)][this.col[i]];
        }
    }


    // EDIT DATA.
    this.Update = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('storageRoom').rows[activeRow];

        // SHOW A DROPDOWN LIST WITH A LIST OF CATEGORIES.
        for (i = 2; i < 5; i++) {
            if (i == 3) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');      // DROPDOWN LIST.
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < this.category.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            else {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input');      // TEXTBOX.
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        var lblCancel = document.getElementById('lbl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:50px; float:left; position: absolute;');

        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'margin-left:30px; background-color:#2DBF64;');

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none;');
    };


    // DELETE DATA.
    this.Delete = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        this.Storage.splice((activeRow - 1), 1);    // DELETE THE ACTIVE ROW.
        this.createTable();                         // REFRESH THE TABLE.
    };

    // SAVE DATA.
    this.Save = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('storageRoom').rows[activeRow];

        // UPDATE Storage ARRAY WITH VALUES.
        for (i = 2, tax=false; i < 5; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {  // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                
                this.Storage[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;      // SAVE THE VALUE.
                if(i==3){
                    var check = td.childNodes[0].value;
                    if (check == 'Food' || check == 'Book' || check == 'Medicine') {
                        tax = false
                    }
                    else if (check == 'Other' || check == 'Music' ){
                        tax = true
                    }
                    this.Storage[(activeRow - 1)][this.col[1]] = 1; //QUANTITY NUMBERING
                }
                if (i == 4) {
                    let imported = this.Storage[(activeRow - 1)][this.col[2]].includes("imported");//DETECT IMPORTED WORD FROM ITEMS
                    //TAX DETECTION
                    if (tax == true){
                        if(imported == true){
                            this.Storage[(activeRow - 1)][this.col[5]] = Math.round((((td.childNodes[0].value*0.1)+(td.childNodes[0].value*0.05)) + Number.EPSILON) * 100) / 100;
                            this.Storage[(activeRow - 1)][this.col[6]] = Math.round((((td.childNodes[0].value*1)+(this.Storage[(activeRow - 1)][this.col[5]]*1)) + Number.EPSILON) * 100) / 100;
                            ; 
                        }
                        if(imported == false){
                            this.Storage[(activeRow - 1)][this.col[5]] = Math.round(((td.childNodes[0].value*0.1) + Number.EPSILON) * 100) / 100;
                            this.Storage[(activeRow - 1)][this.col[6]] = Math.round((((td.childNodes[0].value*1)+(this.Storage[(activeRow - 1)][this.col[5]]*1)) + Number.EPSILON) * 100) / 100;
                        }   
                    }
                    if (tax == false) {
                        if(imported == true){
                            this.Storage[(activeRow - 1)][this.col[5]] = Math.round(((td.childNodes[0].value*0.05) + Number.EPSILON) * 100) / 100;
                            this.Storage[(activeRow - 1)][this.col[6]] = Math.round((((td.childNodes[0].value*1)+(this.Storage[(activeRow - 1)][this.col[5]]*1)) + Number.EPSILON) * 100) / 100;
                        }
                        if(imported == false){
                            this.Storage[(activeRow - 1)][this.col[5]] = 0;
                            this.Storage[(activeRow - 1)][this.col[6]] = Math.round(((td.childNodes[0].value*1) + Number.EPSILON) * 100) / 100;
                        }
                    }
                    if (tax == true || imported == true){ //ROUNDING RULES
                        var convnum = ((( this.Storage[(activeRow - 1)][this.col[5]])*100).toFixed(0)) % 10;
                        if(convnum < 5 && convnum > 0){
                            this.Storage[(activeRow - 1)][this.col[5]] = Math.round((((( this.Storage[(activeRow - 1)][this.col[5]]*100-(convnum*1))+5)/100) + Number.EPSILON) * 100) / 100;
                            this.Storage[(activeRow - 1)][this.col[6]] = Math.round(((this.Storage[(activeRow - 1)][this.col[5]]*1)+(td.childNodes[0].value*1) + Number.EPSILON) * 100) / 100; 
                        }
                        if (convnum < 9 && convnum > 5) {
                            this.Storage[(activeRow - 1)][this.col[5]] = Math.round((((( this.Storage[(activeRow - 1)][this.col[5]]*100-(convnum*1))+10)/100) + Number.EPSILON) * 100) / 100;
                            this.Storage[(activeRow - 1)][this.col[6]] = Math.round(((this.Storage[(activeRow - 1)][this.col[5]]*1)+(td.childNodes[0].value*1) + Number.EPSILON) * 100) / 100;
                        }
                    }
                }
            }
        }

        this.createTable();     // REFRESH THE TABLE.
    }

    // CREATE NEW.
    this.CreateNew = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('storageRoom').rows[activeRow];
        var obj = {};

        // ADD NEW VALUE TO Storage ARRAY.
        for (i = 2, taxes = false; i < 5; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {      // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                var txtVal = td.childNodes[0].value;
                if (txtVal != '') {
                
                    if (i == 3){           
                        if (txtVal == 'Food' || txtVal == 'Book' || txtVal == 'Medicine') {
                            taxes = false
                        }
                        else if (txtVal == 'Other' || txtVal == 'Music' ){
                            taxes = true
                        }
                        obj[this.col[1]] = 1; //QUANTITY NUMBERING
                    }
                    if (i == 4) {
                        let imported = obj[this.col[2]].includes("imported");  //DETECT IMPORTED WORD FROM ITEMS
                        //TAX DETECTION
                        if (taxes == true){
                            if(imported == true){
                                obj[this.col[5]] = Math.round((((txtVal.trim()*0.1)+(txtVal.trim()*0.05)) + Number.EPSILON) * 100) / 100;
                                obj[this.col[6]] = Math.round((((txtVal.trim()*1) + (obj[this.col[5]]*1)) + Number.EPSILON) * 100) / 100;
                            }
                            if(imported == false){
                                obj[this.col[5]] = Math.round(((txtVal.trim()*0.1) + Number.EPSILON) * 100) / 100;
                                obj[this.col[6]] = Math.round((((txtVal.trim()*1) + (obj[this.col[5]]*1)) + Number.EPSILON) * 100) / 100;
                            }
                        }
                        if (taxes == false) {
                            if(imported == true){
                                obj[this.col[5]] = Math.round(((txtVal.trim()*0.05) + Number.EPSILON) * 100) / 100;
                                obj[this.col[6]] = Math.round((((txtVal.trim()*1) + (obj[this.col[5]]*1)) + Number.EPSILON) * 100) / 100;
                            }
                            if(imported == false){
                                obj[this.col[5]] = 0;
                                obj[this.col[6]] = Math.round(((txtVal.trim()*1) + Number.EPSILON) * 100) / 100;
                                ;
                            }
                        }
                        if (taxes == true || imported == true){  //ROUNDING RULES
                            var convnum = ((( obj[this.col[5]])*100).toFixed(0)) % 10;
                            if(convnum < 5 && convnum > 0){
                                obj[this.col[5]] = Math.round((((( obj[this.col[5]]*100-(convnum*1))+5)/100) + Number.EPSILON) * 100) / 100;
                                obj[this.col[6]] = Math.round(((obj[this.col[5]]*1)+(txtVal.trim()*1) + Number.EPSILON) * 100) / 100;
                            }
                            if (convnum < 9 && convnum > 5) {
                                obj[this.col[5]] = Math.round((((( obj[this.col[5]]*100-(convnum*1))+10)/100) + Number.EPSILON) * 100) / 100;
                                obj[this.col[6]] = Math.round(((obj[this.col[5]]*1)+(txtVal.trim()*1) + Number.EPSILON) * 100) / 100;  
                            }
                        }
                    }


                    obj[this.col[i]] = txtVal.trim();
                }
                else {
                    obj = '';
                    alert('all fields are compulsory');
                    break;
                }
            }
        }
        obj[this.col[0]] = this.Storage.length + 1;     // NEW ID.

        if (Object.keys(obj).length > 0) {      // CHECK IF OBJECT IS NOT EMPTY.
            this.Storage.push(obj);             // PUSH (ADD) DATA TO THE JSON ARRAY.
            this.createTable();                 // REFRESH THE TABLE.
        }
    }

    // ****** OPERATIONS END.
}

crudApp.createTable();