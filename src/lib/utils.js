module.exports = {
    age(timestamp) {
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
    date(timestamp) {
        const date = new Date(timestamp);

        const day = `0${date.getDate()}`.slice(-2);
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const year = date.getFullYear();

        return {
            iso: `${year}-${month}-${day}`,
            br: `${day}/${month}/${year}`
        };
    },
    typeBlood() {
        const t1 = ["A1", "A2", "B1", "B2", "AB1", "AB2", "O1", "O2"];
        const t2 = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
        const t0 = [];

        for (const t in t1) {
            t0[t] = {
                back: t1[t],
                front: t2[t]
            }
        }

        return t0;
    }
}