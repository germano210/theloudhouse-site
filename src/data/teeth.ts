type Point = readonly [x: number, y: number];

interface ToothOutline {
  id: string;
  outline: readonly Point[];
}

export const artboard = { width: 769, height: 768 } as const;

// Contornos medidos na transparência do PNG original, com pequena folga
// sob os traços pretos. X cresce para a direita; Y cresce para baixo.
// A ordem associa cada dente ao item correspondente de sites.ts.
export const toothOutlines = [
  {
    id: 'superior-centro-esquerdo',
    outline: [
      [342, 297], [334, 300], [318, 308], [307, 316], [285, 357],
      [276, 385], [270, 414], [266, 439], [264, 475], [270, 475],
      [348, 438], [360, 342], [359, 316], [356, 305], [351, 297],
    ],
  },
  {
    id: 'superior-centro-direito',
    outline: [
      [406, 297], [397, 300], [384, 310], [372, 335], [368, 349],
      [366, 351], [364, 363], [354, 369], [354, 373], [361, 374],
      [349, 437], [354, 437], [364, 432], [381, 429], [383, 428],
      [379, 427], [380, 426], [441, 403], [448, 358], [448, 335],
      [454, 332], [454, 328], [432, 326], [422, 321], [431, 320],
      [421, 311], [410, 297],
    ],
  },
  {
    id: 'superior-esquerdo',
    outline: [
      [259, 351], [223, 379], [220, 385], [203, 436], [200, 464],
      [200, 495], [205, 495], [253, 481], [264, 475], [263, 473],
      [268, 424], [268, 384], [264, 351],
    ],
  },
  {
    id: 'superior-direito',
    outline: [
      [462, 308], [468, 312], [476, 320], [451, 328], [451, 332],
      [462, 333], [453, 348], [449, 360], [445, 378], [443, 401],
      [449, 401], [497, 384], [493, 371], [493, 363], [483, 336],
      [487, 335], [487, 319], [481, 312], [468, 308],
    ],
  },
  {
    id: 'inferior-esquerdo',
    outline: [
      [258, 479], [228, 494], [225, 500], [228, 501], [223, 505],
      [220, 510], [201, 549], [196, 556], [194, 611], [201, 631],
      [208, 645], [213, 645], [240, 625], [249, 602], [257, 568],
      [264, 479],
    ],
  },
  {
    id: 'inferior-centro-esquerdo',
    outline: [
      [342, 442], [263, 478], [261, 498], [262, 499], [260, 541],
      [258, 554], [258, 575], [261, 602], [263, 608], [267, 608],
      [321, 573], [332, 539], [332, 534], [336, 521], [340, 484],
      [342, 479], [342, 470], [347, 442],
    ],
  },
  {
    id: 'inferior-centro-direito',
    outline: [
      [435, 407], [346, 441], [346, 450], [341, 473], [338, 503],
      [338, 561], [344, 561], [399, 530], [401, 527], [411, 525],
      [419, 520], [425, 508], [429, 493], [429, 484], [432, 474],
      [432, 467], [439, 426], [440, 407],
    ],
  },
  {
    id: 'inferior-direito',
    outline: [
      [492, 386], [441, 407], [433, 466], [433, 482], [437, 500],
      [445, 509], [452, 509], [500, 490], [506, 452], [506, 442],
      [498, 386],
    ],
  },
] as const satisfies readonly ToothOutline[];

// A imagem sempre cobre o contorno inteiro. Alterar os pontos não exige
// sincronizar manualmente x/y/width/height em outro lugar.
export const toothSlots = toothOutlines.map(({ id, outline }) => {
  const xs = outline.map(([x]) => x);
  const ys = outline.map(([, y]) => y);
  const x = Math.min(...xs) - 2;
  const y = Math.min(...ys) - 2;

  return {
    id,
    path: `${outline.map(([px, py], index) => `${index === 0 ? 'M' : 'L'}${px} ${py}`).join(' ')} Z`,
    x,
    y,
    width: Math.max(...xs) - x + 2,
    height: Math.max(...ys) - y + 2,
  };
});
