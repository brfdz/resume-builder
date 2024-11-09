<template>
<teleport to="body">
<div class="modal fade" id="appModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">
            {{ title }}
        </h1>
        <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal" @click="$emit('clearData')"></button>
      </div>
      <div class="modal-body">
        {{ message}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('clearData')">
            {{ clearBtn }}
        </button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('startStored')">
            {{ confirmBtn }}
        </button>
      </div>
    </div>
  </div>
</div>
</teleport>
</template>


<script>
    export default {
        emits: ['startStored', 'clearData'],
        data(){
            return {
                title: 'Resume Builder',
                message: 'You have some saved data from your last session. Would you like to continue where you left off ?',
                confirmBtn: 'Continue',
                clearBtn: 'Clear data'
            };
        }
    }
</script>