# Generated slimmer bird atlas

Date: September 29, 2026
Mode: built-in image_gen, two successive edits.
Status: installed locally for Lucie's review, not final approval.

## Inputs and outputs

The first edit used `public/assets/generations/goldfinch-painted-atlas-v2.png` as its layout and motion reference and `public/assets/optimized/painting.jpg` as the anatomy and brushwork authority. It produced `goldfinch-painted-atlas-v3.png`. A focused second edit used v3 plus the same painting reference and produced the active `public/assets/generations/goldfinch-painted-atlas-v4.png`.

Both generated files are 1254 by 1254 RGBA PNGs. Their generated alpha is preserved. No silhouette reshaping, background removal, or image repainting was done in code. All sixteen complete poses are drawn from the atlas. Source crops were remeasured, with transparent padding around the feathers; an equal .94 scale on both axes fits the new art into the previous bird coordinates. The previous full-body pose renderer and timing are restored. The original-paint final landing pose and longer closing hold remain from the prior landing pass.

Original outputs:
- `/Users/lucieoken/.codex/generated_images/01a0a6f9-22aa-7391-8ad1-ac823251e809/exec-87b31847-5d69-42d6-baba-37fce516b82e.png`
- `/Users/lucieoken/.codex/generated_images/01a0a6f9-22aa-7391-8ad1-ac823251e809/exec-67a11287-6e09-423a-a730-6de07ecbbd52.png`

## Initial prompt

Use case: precise-object-edit.
Asset type: production transparent 4-by-4 bird animation atlas, square PNG with genuine alpha.
Image 1 is the edit target: preserve its 16 full-body poses, pose order, wingbeat, rightward flight direction, cell placement, painterly texture and muted palette. Image 2 is the anatomical and brushwork authority: Fabritius's original bird.
Regenerate the bird's body in all 16 poses with proportions much closer to Image 2. Give it a slender elongated torso, a shallower chest and belly (about 20 percent less bulky perpendicular to the body axis), a narrow shoulder-to-neck transition, and the long tapered tail of the painting. Preserve natural anatomy; do not squeeze or stretch the whole bird. Retain the small dark eye, muted rusty face, warm grey-buff body, dark wing and straw-yellow stripe, with loose irregular oil brushwork. No glossy photographic feather detail.
The first pose must closely match the upright posture and silhouette of the original painting, including its front-three-quarter head. The second pose is only a gentle forward lean with toes planted, never a round squat. The head progressively turns toward the flight direction in poses 2–4. All 12 flying poses face right in natural three-quarter side profile, with the beak pointing forward, not at the viewer. Keep the same slim torso, head size, body length and tail proportions across the full sequence. All wings and bodies belong to complete painted birds; retain the integrated full-body pose animation.
Keep exactly 16 separate poses in a clean invisible 4-by-4 equal-cell grid, left to right then top to bottom. Entire birds and wingtips fit within each cell with generous transparent clearance. First row: rest, slight lean, opening wings, push-off. Remaining rows: the same continuous wingbeat as Image 1. No grid, labels, shadows, perch or chain. True transparent alpha, no checkerboard, white matte, pale outline or background fringe. Clean softly painted feather edges directly into transparency.

## Final refinement prompt

Use case: precise-object-edit. Edit Image 1, a transparent 16-pose bird animation atlas. Image 2 is the original Fabritius painting and is the exact anatomy reference.
Make one focused correction: the torso in Image 1 is still too round and short. Redraw the body silhouette of every pose to be clearly slender and elongated like the original. Reduce chest and belly depth perpendicular to the spine by a further 20 percent, without shrinking or squashing the head, wings, feet or total bird length. The bird should have a small chest flowing into a long narrow abdomen and long dark tapered tail, not a plump oval belly. Make the folded first pose match the original bird's steep upright posture, narrow shoulder and long tail which extends noticeably down-left below the level of its toes. In pose 2 retain that long lean bird with only a subtle forward tilt, no deep squat or horizontal barrel chest.
Preserve the 4-by-4 layout, exactly 16 separate complete birds, pose order and wingbeat, all feather colors and loose muted oil brushwork. Preserve the natural right-facing head turn and integrated full-body poses during flight. Keep generous transparent separation and uncropped wing tips. No perch, chain, text, grids, shadows or other objects. Return a PNG with genuine transparent alpha, no white fringe, outline, background or checkerboard.
