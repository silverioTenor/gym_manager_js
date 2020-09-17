module.exports = {
    age: (timestamp) => {
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        const date = today.getDate() - birthDate.getDate();
        
        if(month < 0 || month == 0 && date < 0) {
            age = age - 1;
        }

        return age;
    },
    date: (timestamp) => {
        const date = new Date(timestamp);

        const day = `0${date.getUTCDate()}`.slice(-2);
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const year = date.getUTCFullYear();

        return {
            iso: `${year}-${month}-${day}`,
            br: `${day}/${month}/${year}`
        };
    }
}