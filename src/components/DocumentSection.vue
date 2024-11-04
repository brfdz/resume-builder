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

        <!-- Used for multiple column view -->
        <div class="container" v-if="$slots['column-view']">
            <div class="row">
                <slot name="column-view"></slot>
            </div>
        </div>
    </section>
    
</template>

<script>
    export default {
        props: {
            header: String,
        }
    }
</script>

<style scoped>
    section{
        margin-bottom: 1rem;
    }

    h2{
        font-size: 1.2em;
        text-align: left;
    }

    hr {
        margin: 0;
        margin-bottom: 0.7rem;
    }

    .container {
        width: 100%;
    }
</style>