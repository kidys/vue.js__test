<template>    
    <div>
        <h2>Список городов:</h2>
        <ul>
            <li v-for="city in cities" v-bind:key="city.id">
                <span class="text" :class="city.is_selected ? 'text--disabled' : ''">{{ city.name }}</span>
                <span class="button-group" :class="city.is_selected ? 'button-group--disabled' : ''">
                    <button :data-id="city.id" :disabled="city.is_selected" v-on:click="addCityTop">top</button>
                    <button :data-id="city.id" class="button" :class="route.length < 2 ? 'button--disabled' : ''" :disabled="city.is_selected || route.length < 2" v-on:click="addCityMid">mid</button>
                    <button :data-id="city.id" class="button" :class="route.length < 1 ? 'button--disabled' : ''" :disabled="city.is_selected || route.length < 1" v-on:click="addCityEnd">end</button>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['cities', 'route'],
    methods: {
        addCityTop(event){
            this.$emit('addCity', {
                id: parseInt(event.target.dataset.id),
                type: 'top'
            });
        },
        addCityMid(event){
            this.$emit('addCity', {
                id: parseInt(event.target.dataset.id),
                type: 'mid'
            });
        },
        addCityEnd(event){
            this.$emit('addCity', {
                id: parseInt(event.target.dataset.id),
                type: 'end'
            });
        }
    }
}
</script>

<style scoped>
    button {
        cursor: pointer;
    }

    button:nth-child(1) {
        background-color: #006600;
        color: white;
        border: none;
        padding: 3px 6px;
    }

    button:nth-child(2) {
        background-color: #000066;
        color: white;
        border: none;
        padding: 3px 6px;
    }

    button:nth-child(3) {
        background-color: #336633;
        color: white;
        border: none;
        padding: 3px 6px;
    }

    .text--disabled {
        color: #999;
    }

    .button-group--disabled button, button.button--disabled {
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
        margin-right: 5px;
        text-align: center;
    }

    li span:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 50%;
    }

    li button {
        margin-left: 2px;
    }
</style>