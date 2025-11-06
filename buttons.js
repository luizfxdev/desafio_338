// Animações dos botões com GSAP - Idêntico ao original
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.button--bubble');

  buttons.forEach(function (button) {
    const circlesTopLeft = button.parentElement.querySelectorAll('.circle.top-left');
    const circlesBottomRight = button.parentElement.querySelectorAll('.circle.bottom-right');
    const effectButton = button.parentElement.querySelector('.button.effect-button');

    // Timeline principal (paused)
    const btTl = gsap.timeline({ paused: true });

    // Timeline 1 - Círculos superior esquerdo
    const tl = gsap.timeline();
    tl.to(circlesTopLeft, {
      duration: 1.2,
      x: -25,
      y: -25,
      scaleY: 2,
      ease: 'slow(0.1, 0.7, false)'
    });
    tl.to(circlesTopLeft[0], {
      duration: 0.1,
      scale: 0.2,
      x: '+=6',
      y: '-=2'
    });
    tl.to(
      circlesTopLeft[1],
      {
        duration: 0.1,
        scaleX: 1,
        scaleY: 0.8,
        x: '-=10',
        y: '-=7'
      },
      '-=0.1'
    );
    tl.to(
      circlesTopLeft[2],
      {
        duration: 0.1,
        scale: 0.2,
        x: '-=15',
        y: '+=6'
      },
      '-=0.1'
    );
    tl.to(circlesTopLeft[0], {
      duration: 1,
      scale: 0,
      x: '-=5',
      y: '-=15',
      opacity: 0
    });
    tl.to(
      circlesTopLeft[1],
      {
        duration: 1,
        scaleX: 0.4,
        scaleY: 0.4,
        x: '-=10',
        y: '-=10',
        opacity: 0
      },
      '-=1'
    );
    tl.to(
      circlesTopLeft[2],
      {
        duration: 1,
        scale: 0,
        x: '-=15',
        y: '+=5',
        opacity: 0
      },
      '-=1'
    );

    // Timeline com set inicial
    const tlBt1 = gsap.timeline();
    tlBt1.set(circlesTopLeft, { x: 0, y: 0, rotation: -45 });
    tlBt1.add(tl);

    // Timeline 2 - Círculos inferior direito
    const tl2 = gsap.timeline();
    tl2.set(circlesBottomRight, { x: 0, y: 0 });
    tl2.to(circlesBottomRight, {
      duration: 1.1,
      x: 30,
      y: 30,
      ease: 'slow(0.1, 0.7, false)'
    });
    tl2.to(circlesBottomRight[0], {
      duration: 0.1,
      scale: 0.2,
      x: '-=6',
      y: '+=3'
    });
    tl2.to(
      circlesBottomRight[1],
      {
        duration: 0.1,
        scale: 0.8,
        x: '+=7',
        y: '+=3'
      },
      '-=0.1'
    );
    tl2.to(
      circlesBottomRight[2],
      {
        duration: 0.1,
        scale: 0.2,
        x: '+=15',
        y: '-=6'
      },
      '-=0.2'
    );
    tl2.to(circlesBottomRight[0], {
      duration: 1,
      scale: 0,
      x: '+=5',
      y: '+=15',
      opacity: 0
    });
    tl2.to(
      circlesBottomRight[1],
      {
        duration: 1,
        scale: 0.4,
        x: '+=7',
        y: '+=7',
        opacity: 0
      },
      '-=1'
    );
    tl2.to(
      circlesBottomRight[2],
      {
        duration: 1,
        scale: 0,
        x: '+=15',
        y: '-=5',
        opacity: 0
      },
      '-=1'
    );

    // Timeline com set inicial
    const tlBt2 = gsap.timeline();
    tlBt2.set(circlesBottomRight, { x: 0, y: 0, rotation: 45 });
    tlBt2.add(tl2);

    // Construir timeline principal
    btTl.add(tlBt1);
    btTl.to(
      effectButton,
      {
        duration: 0.8,
        scaleY: 1.1
      },
      0.1
    );
    btTl.add(tlBt2, 0.2);
    btTl.to(
      effectButton,
      {
        duration: 1.8,
        scale: 1,
        ease: 'elastic.out(1.2, 0.4)'
      },
      1.2
    );

    // Aumentar velocidade
    btTl.timeScale(2.6);

    // Evento mouseover
    button.addEventListener('mouseover', function () {
      btTl.restart();
    });
  });
});
