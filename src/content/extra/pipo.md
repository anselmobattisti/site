---
titulo: "Pipo no Jardim"
data: 2026-11-15
periodo: "2026"
chamada: "A Super Nintendo game for a three-year-old, made with my son Oliver."
plataforma: "Super Nintendo (.sfc ROM)"
feitoCom: "Python 3 and Pillow, generating 65816 and SPC700 assembly"
feitoJunto: "Oliver, my son"
linkCodigo: "https://github.com/anselmobattisti/pipo"
resumo: "Pipo no Jardim (“Pipo in the Garden”) is a SNES game designed for a child of about three. Pipo, a little chick, walks around a garden solving simple puzzles. Nobody dies, there is no clock and no score: a wrong move simply does nothing, and a right one makes Pipo jump with a heart and sparkles."
---

Each of the ten levels ends at a star, and with every star Pipo grows a
little, from chick to rooster. The mischief comes from Cururu, a toad who
lives in the pond: at the start of each level he hops through the tidy garden
emptying the baskets, scaring the animals and breaking the bridges, and then
Pipo puts everything back.

<div class="shots">
  <figure>
    <img src="/extra/pipo/abertura.png" alt="Title screen: Pipo in the garden under the title Pipo no Jardim, with a menu offering Português or English." width="512" height="448">
    <figcaption>The opening: choosing the language.</figcaption>
  </figure>
  <figure>
    <img src="/extra/pipo/fase1.png" alt="Level 1: a garden with a pond, a path, three coloured baskets and Pipo next to the yellow one." width="512" height="448">
    <figcaption>Level 1: each ball goes in the basket of its colour.</figcaption>
  </figure>
  <figure>
    <img src="/extra/pipo/fase6.png" alt="Level 6: three ducklings gathered around Pipo in the garden, with the mother duck waiting in the pond." width="512" height="448">
    <figcaption>Level 6: the lost ducklings follow Pipo home.</figcaption>
  </figure>
  <figure>
    <img src="/extra/pipo/final.png" alt="Ending screen: the word FIM! over the garden, the animals with hearts above them and the message that all the friends are happy." width="512" height="448">
    <figcaption>The ending: all the friends are happy.</figcaption>
  </figure>
</div>

## The levels

1. **The garden.** Each ball goes in the basket of the same colour.
2. **Bouncing balls.** The same, but the balls hop around the field.
3. **Shapes.** Circle, square and triangle each fit a hole.
4. **Hide and seek.** Three friends hide in bushes drawn at random each time.
5. **Buttons and bridges.** Stepping on a coloured button raises the bridge of that colour.
6. **Lost ducklings.** The ducklings follow Pipo in a line back to their mother.
7. **Watering the flowers.** Pick up the watering can and water three sprouts.
8. **Snack time.** Bring each animal the food shown in its speech bubble.
9. **Firefly night.** A dark level: lead the fireflies to the lanterns.
10. **The hen's eggs.** Find the eggs hidden in the hay and take them to the nest.

## Designed for small hands

Everything happens by walking into things, so the directional pad is the only
control that matters. Any other button just moves the text along, and the text
also moves on by itself after five seconds, so a child who cannot read yet is
never stuck on a message. The opening menu offers Portuguese or English, sound
on or off, and three walking speeds for Pipo.

## How it is built

The whole game comes out of one Python script. The 65816 code is written in a
small Python DSL and assembled by a minimal assembler that lives in the
repository, alongside an SPC700 assembler and BRR encoder for the sound. The
graphics are drawn in code too. The background music is the Brazilian folk
song “Sapo Cururu”, which is in the public domain.

```bash
python3 build.py            # writes pipo.sfc
python3 tools/test_play.py  # plays all ten levels and the ending by itself
```

The second command runs the game in a small emulator written for the tests,
plays it from the first level to the ending and saves screenshots along the
way. The images on this page come from that run.

## How to play

I recommend the [Snes9x](https://www.snes9x.com/) emulator: install it and
open the `pipo.sfc` file, nothing else to configure.
