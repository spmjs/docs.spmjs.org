# SPM

- template: home.html

--------
<style>
body {
    height: 600px;
}
h1.entry-title, .navigation, #color-bar, .footer, #extra {
    display: none;
}
.row {
    background: white;
}
#loading {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 100px;
    line-height: 100px;
    margin-left: -100px;
    margin-top: -50px;
    color: #ccc;
    font-size: 30px;
    text-align: center;
}
</style>

<div id="loading">Loading...</div>

<script>
window.location.href = '/doc/';
</script>