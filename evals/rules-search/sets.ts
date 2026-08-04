import type { EvalSet } from './dataset';
import root from './root';
import wingspan from './wingspan';
import wingspanAsia from './wingspan-asia';

// The evaluation sets, ordered by how hard the corpus is.
//
// They are deliberately different shapes, because retrieval behaves differently
// on each: Wingspan is a short, plainly written rulebook (~21 chunks), Wingspan
// Asia is an expansion that restates the game it modifies (~43 chunks), and Root
// is a long legal-style ruleset with five structurally parallel faction sections
// (~113 chunks). A change that helps one can hurt another, which is the point of
// keeping all three.
const SETS: EvalSet[] = [wingspan, wingspanAsia, root];

export default SETS;
