<template>
    <section>
        <header v-if="header">
        <h2>
            {{ header }}
        </h2>
        <hr>
        </header>
        <div>
            <slot></slot>
        </div>
    </section>
    
</template>

<script>
    export default {
        props: {
            header: {
                type: String
            }
        }
    }
</script>

<style scoped>
    section{
        margin-bottom: 1.5rem;
    }

    h2{
        font-size: 1.1em;
        text-align: left;
    }

    hr {
        margin: 0;
        margin-bottom: 0.7rem;
    }
</style>