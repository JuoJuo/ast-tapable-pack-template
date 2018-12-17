window.app.addEventListener('click', function () {
    import('./click.js').then((param) => {
        console.log(param);
    })
})