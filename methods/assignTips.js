const assignTips = {
    assignTips: (employees, shiftValues) => {
        let tips = employees.map((val, i) => {
            switch (val.emp) {
                case 'Barista':
                    val.tips = shiftValues.bariAndCashiTips.toFixed(2);
                    return val;
                case 'Cashier':
                    val.tips = shiftValues.bariAndCashiTips.toFixed(2)
                    return val;
                case 'Barback':
                    val.tips = shiftValues.bbTips.toFixed(2);
                    return val;
                case 'K1': 
                    val.tips = shiftValues.k1k2Tips.toFixed(2);
                    return val;
                case 'K2':
                    val.tips = shiftValues.k1k2Tips.toFixed(2) 
                    return val;
                case 'K3':
                    val.tips = shiftValues.k3Tips.toFixed(2);
                    return val;
                case 'K4':
                    val.tips = 0;
                    return val;
                break;
            }
        })
        return tips;
    }
}

export default assignTips;