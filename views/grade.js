const getResult = () => {
    let c1 = document.getElementById('c1').value;
    let g1 = document.getElementById('g1').value;

    let c2 = document.getElementById('c2').value;
    let g2 = document.getElementById('g2').value;

    let c3 = document.getElementById('c3').value;
    let g3 = document.getElementById('g3').value;

    let c4 = document.getElementById('c4').value;
    let g4 = document.getElementById('g4').value;

    let c5 = document.getElementById('c5').value;
    let g5 = document.getElementById('g5').value;

    let c6 = document.getElementById('c6').value;
    let g6 = document.getElementById('g6').value;

    let c7 = document.getElementById('c7').value;
    let g7 = document.getElementById('g7').value;

    let c8 = document.getElementById('c8').value;
    let g8 = document.getElementById('g8').value;

    let grade = parseFloat(c1*g1) + parseFloat(c2*g2) + parseFloat(c3*g3) + parseFloat(c4*g4) + parseFloat(c5*g5) + parseFloat(c6*g6) + parseFloat(c7*g7) + parseFloat(c8*g8);
    let credit = parseFloat(c1) + parseFloat(c2) + parseFloat(c3) + parseFloat(c4) + parseFloat(c5) + parseFloat(c6) + parseFloat(c7) + parseFloat(c8);
    let total = grade/credit;

    document.getElementById('total').innerHTML = total;
}