<template>
    <div class="entry">
        <div class="head-row">
            <p><strong>{{ header }}</strong> {{ secondaryHeader }}</p>
            <p>{{ dates }}</p>
        </div>
        <div class="entry-body">
            <p>
                <slot></slot>
            </p>
        </div>
    </div> 
</template>

<script>
    export default {
        props: {
            title: String,
            titleSecondary: String,
            info: String, //city, level or custom
            infoSecondary: String, //country or custom
            entryStartDate: String,
            entryEndDate: String
        },
        computed: {
            header(){
                return [this.title, this.titleSecondary].filter(value => value).join(', ');
            },
            secondaryHeader(){
                return [this.info, this.infoSecondary].filter(value => value).join(', ');
            },
            dates(){
                return [this.entryStartDate, this.entryEndDate].filter(value => value).join(' - ');
            }
        },
    }
</script>

<style scoped>
    .entry{
        margin-bottom: 0.5rem;
    }

    .entry-body {
        width: 95%;
        justify-self: center;
    }

    .head-row{
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
    }

    p {
        font-size: 0.7em;
        margin: 0;
    }
</style>