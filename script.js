const app = new Vue({
    el: '.btc-badge',
    data: {
        btcUSD: '0.00',
	sell: '0.00',
        percentChange: '0',
        sellChange: '0',
        upDown: 'up',
    },
    mounted() {
        this.getInfo();

        setInterval(() => {
            this.getInfo();
        }, 1000 * 60);
    },
    methods: {
        getChange(newPrice) {
            this.percentChange = newPrice
            if (newPrice > 0) {
                this.upDown = 'up'
            } else {
                this.upDown = 'down'
            }
        },
        getInfo() {
            axios.get('https://apicheckprice.huasengheng.com/api/values/getprice/')
                //   .then(function (response) {
                .then(response => {
                    const { GoldType, Buy, Sell, BuyChange, SellChange, TimeUpdate } = response.data[0]
                    console.log(`${response.data[0].BuyChange}`)
                    const open = Buy
                    this.getChange(BuyChange)
		    this.sell = Sell
                    this.sellChange = SellChange
                    this.btcUSD = Buy
                });
        }
    },
});