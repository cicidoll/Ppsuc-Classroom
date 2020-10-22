Vue.component('pane', {
    name: 'pane',
    template: '\
    <transition mode="out-in">\
        <div class="pane" v-show="show"> \
            <slot></slot> \
        </div> \
    </transition>',
    data:function () {
        return {
            show:true
        }
    },
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateNav () {
            this.$parent.updateNav();
        }
    },
    watch: {
        label () {
            this.updateNav();
        }
    },
    mounted () {
        this.updateNav();
    }
})