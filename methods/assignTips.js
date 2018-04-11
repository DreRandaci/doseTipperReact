// Creates a new note obj
const assignTips = {
    assignTips: (employees, shiftValues) => {
        let tips = employees.map((val, i) => {
            switch (val.emp) {
                case 'Barista':
                    val.tips = shiftValues.bariAndCashiTips;
                    return val;
                case 'Cashier':
                    val.tips = shiftValues.bariAndCashiTips
                    return val;
                case 'Barback':
                    val.tips = shiftValues.bbTips;
                    return val;
                case 'K1': 
                    val.tips = shiftValues.k1k2Tips;
                    return val;
                case 'K2':
                    val.tips = shiftValues.k1k2Tips 
                    return val;
                case 'K3':
                    val.tips = shiftValues.k3Tips;
                    return val;
                break;
            }
        })
        return tips;
    }
}

export default assignTips;