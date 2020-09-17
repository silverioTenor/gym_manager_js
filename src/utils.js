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
    }
}