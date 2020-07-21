let fs = require('fs');
let max = {
    readData: function() {
        let path = __dirname + '/partitions.json';
        let data = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return data;
    },
    init: function() {
        let data = this.readData();
        let max = 0;
        let obj;
        data.forEach((elem, ind) => {
            if(elem.position > max) {
                max = elem.position;
                obj = elem;
            }
        });
        console.log(obj.position, obj.value.length);
    }
};
max.init();