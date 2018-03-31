import './scss/styles.scss'

window.onload = () => {
    document.getElementById('input')
        .onsubmit = () => {
            console.log(
                document.getElementById('input__field').value
                    || document.getElementById('input__field').placeholder
            )
            return false
        }
}
