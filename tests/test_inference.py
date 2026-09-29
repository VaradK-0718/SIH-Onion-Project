import unittest

from ml.inference import run_two_stage_inference


class InferenceDeterminismTest(unittest.TestCase):
    def test_same_input_produces_same_quality_output(self):
        first = run_two_stage_inference(None, preset_type='single_onion')
        second = run_two_stage_inference(None, preset_type='single_onion')

        self.assertEqual(first['quality_score'], second['quality_score'])
        self.assertEqual(first['grade_a'], second['grade_a'])
        self.assertEqual(first['grade_b'], second['grade_b'])
        self.assertEqual(first['urs'], second['urs'])
        self.assertEqual(first['detected_onions_count'], second['detected_onions_count'])

    def test_grading_totals_remain_consistent(self):
        result = run_two_stage_inference(None, preset_type='single_onion')

        self.assertEqual(result['grade_a'] + result['grade_b'] + result['urs'], 100)
        self.assertGreaterEqual(result['quality_score'], 70)
        self.assertLessEqual(result['quality_score'], 100)

    def test_classification_explanation_matches_reported_grade_split(self):
        result = run_two_stage_inference(None, preset_type='standard')
        explanation = result['classification_explanation']

        self.assertEqual(explanation['method'], 'deterministic_demo_score_split')
        self.assertEqual(len(explanation['score_formula']), 3)
        self.assertEqual(
            explanation['procurement_rule']['passed'],
            result['grade_a'] >= 65 and result['urs'] <= 15
        )
        self.assertIn(str(result['quality_score']), explanation['evidence_note'])


if __name__ == '__main__':
    unittest.main()
