<template>    
    <div class="wrapper">
        <div class="content" :class="route.length < 1 ? 'content--empty' : ''">
            <h2>Маршрут:</h2>
            <ul v-if="route.length > 0">
                <li v-for="(item, i) of route" :key="i">
                    <span>{{ item }}</span>
                    <button :data-name="item" v-on:click="removeCityFromRoute">del</button>
                </li>
            </ul>
            <div v-else class="route-empty">Нет маршрута...</div>
        </div>
        <button class="route-save" :class="route.length < 2 ? 'route-save--disabled' : ''" :disabled="route.length < 2" v-on:click="handleSaveRoute">save route</button>
    </div>
</template>

<script>
export default {
    props: ['route'],
    methods: {
        removeCityFromRoute(event){
            this.$emit('removeCity', {
                name: event.target.dataset.name
            });
        },
        handleSaveRoute() {
            localStorage.setItem('route', JSON.stringify(this.route));
        }
    }
}
</script>

<style scoped>
    .route-empty {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #dadada;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        height: 100%;
    }

    .content {
        flex-grow: 1;
    }

    .content--empty {
        display: flex;
        flex-direction: column;
    }

    button {
        border: none;
        padding: 3px 6px;
        cursor: pointer;
        border-radius: 4px;
        text-align: center;
    }

    li button {
        background-color: #990000;
        color: white;        
    }

    .route-save {
        background-color: #ccc;
        color: #222;
        display: block;
        border: 1px solid #444;
        width: 100%;
        margin: 15px 0 5px 0;
    }

    .route-save--disabled {
        border: 1px solid #ccc;
        background-color: #ccc;
        color: #aaa;
        cursor: default;
    }

    h2 {
        font-size: 1.15rem;
        margin: 0 0 10px 0;
        padding-bottom: 5px;
        text-align: center;
        border-bottom: 1px solid #ccc;
    }

    ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        margin: 5px 0;
        flex-grow: 1;
    }

    li {
        display: flex;
        justify-content: space-around;
        align-items: stretch;
        margin: 5px 0;
    }

    li span:nth-child(1) {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    li button {
        margin-left: 2px;
    }
</style>