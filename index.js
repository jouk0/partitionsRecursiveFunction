let fs = require('fs');
let partitions = {
    readData: function() {
        let path = __dirname + '/partitions.json';
        let data = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return data;
    },
    saveData: function(object) {
        let path = __dirname + '/partitions.json';
        let data = this.readData();
        let found = false;
        data.forEach((elem, ind) => {
            if(elem.position === object.position) {
                found = true;
            }
        });
        if(!found) {
            data.push(object);
            fs.writeFileSync(path, JSON.stringify(data, (key, value) =>
                typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
            ));
        }
    },
    fieldSize: function(at) {
        if(at === 1) {
            return BigInt(1);
        } else if(at === 2) {
            return BigInt(2)
        } else if(at === 3) {
            return BigInt(3);
        } else if(at === 4) {
            return BigInt(5);
        } else {
            let data = this.readData();
            let position1 = 0;
            let position2 = 0;
            let position3 = 0;
            let position4 = 0;
            data.forEach((elem, ind) => {
                if((at-1) === elem.position) {
                    position1 = elem.value;
                }
                if((at-2) === elem.position) {
                    position2 = elem.value;
                }
                if((at-4) === elem.position) {
                    position3 = elem.value;
                }
                if((at-6) === elem.position) {
                    position3 = elem.value;
                }
            });
            if(!position1) {
                position1 = this.fieldSize(at - 1);
            }
            if(!position2) {
                position2 = this.fieldSize(at - 2);
            }
            if(!position3) {
                position3 = this.fieldSize(at - 4);
            }
            if(!position4) {
                position4 = this.fieldSize(at - 6);
            }
            let calc1 = BigInt(position1 + position2);
            let calc2 = BigInt(BigInt(calc1) - BigInt(position3));
            let dataObject = {
                position: at,
                value: BigInt(calc2 + BigInt(position4))
            }; 
            this.saveData(dataObject);
            return BigInt(dataObject.value);
        }
    },
    init: function() {
        console.log(this.fieldSize(4000));
    }
};