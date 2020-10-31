# sakalli-js

## Js package for working with [sakalli](https://github.com/zedObaia/sakalli)


## Installation 
* Using npm

        `npm install --save  sakalli`

## Usage 

* Vanilla Js [Example](https://github.com/ZedObaia/sakalli/tree/master/examples/client)
    ```
    const sakalli = new Sakalli("localhost:8080"); // or your server ip
        window.onload = function () {
        let connected = sakalli.connect("555"); // 555 is the user id, to isolate each user 
        if (connected) {
            sakalli.on('notification', data => {
            console.log(data);
            })
            sakalli.on('opened', function () {
            console.log("connection established!!");
            })
            sakalli.on('closed', () => {
            console.log("connection closed!!");
            })
        }
        };
    ```
* Vue
    
    * In your `main.js` or entry point add

        ```
        import Sakalli from "@zedobaia/sakalli";
        
        Vue.prototype.$sakalli = new Sakalli("localhost:8080");
        ```
    * In you `App.vue` or your base component add 
        ```
        mounted() {
            
            this.$sakalli.on("notification", data => {
                console.log(data);
            });
            this.$sakalli.on("opened", () => {
                console.log("VUE: sakalli connection opened");
            });

            this.$sakalli.on("Status", () => {
                console.log("VUE: sakalli connection closed");
            });
            
        }

        beforeDestroy() {
            this.$sakalli.destroy()
        },
        ```

    * When you get your user id call `$sakalli.connect(id)`
        ```
            // assuming you get the user id in vuex store
            let id = ...
            this._vm.$sakalli.connect(id)
        ```