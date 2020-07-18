<template>
    <div>
        <h1>Проект по городам</h1>
        <div class="content content--loading" v-if="is_loading">Идет загрузка...</div>
        <div class="content" v-else>
            <div class="content__child">
                <route-list v-bind:route="getRoute()" v-on:removeCity="handleRemoveCityFromRoute($event)" />
            </div>
            <div class="content__child">
                <cities-list v-bind:route="getRoute()" v-bind:cities="cities" v-on:addCity="handleAddCity($event)" />
            </div>
        </div>
    </div>
</template>

<script>
import { getCities } from './api';

import citiesList from './components/citiesList.vue';
import routeList from './components/routeList.vue';

export default {
    data() {
        return {
            is_loading: false,
            cities: [],
            route: []
        }
    },
    components: {
        citiesList, routeList
    },
    mounted() {
        this.is_loading = true;

        getCities().then(response => {
            setTimeout(() => {
                this.cities = (response.status === 200) ? response.data.cities : [];

                if (this.cities.length) {
                    this.cities = this.cities.map((city, i) => {
                        return { ...city, is_selected: false };
                    });
                }

                this.is_loading = false;

                this.route = localStorage.getItem('route') ? JSON.parse(localStorage.getItem('route')) : this.route;

                this.cities.forEach((item, i) => {
                    this.route.forEach((item_2, j) => {
                        if (item.name === item_2) this.cities[i].is_selected = true;
                    });
                });
            }, 3000);
        });
    },
    methods: {
        getRoute() {
            return this.route;
        },
        handleRemoveCityFromRoute(data) {
            const { name } = data;            

            this.cities.forEach((city, i) => {
                if (city.name === name) {
                    this.cities[i].is_selected = false;
                } 
            });            

            this.route = this.route.filter((city, i) => city != name);
        },
        handleAddCity(data) {
            const { id, type } = data;

            this.cities.map((city, i) => {
                if (city.id === id) {
                    city.is_selected = true;

                    switch (type) {
                        case 'top':                            
                            this.route.splice(0, 0, city.name);
                            break;
                        case 'mid':
                            this.route.splice(this.route.length / 2, 0, city.name);
                            break;
                        case 'end':
                            this.route.splice(this.route.length, 0, city.name);
                            break;
                        default:
                            return false;
                    }
                }
            });
        }
    }
}
</script>

<style scoped>
    h1 {
        text-align: center;
    }

    .content {
        max-width: 768px;
        margin: 1rem auto;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
    }

    .content__child {
        border: 1px solid #ccc;
        padding: 5px;
        margin: 10px;
        flex-basis: 50%;
    }

    .content--loading {
        text-align: center;
        justify-content: center;
    }

    @media screen and (max-width: 770px) {
        .content {
            flex-direction: column;
        }
    }
</style>