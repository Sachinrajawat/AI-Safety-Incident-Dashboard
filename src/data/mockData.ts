import { Incident } from '../types/incident';

export const mockIncidents: Incident[] = [
  {
    "id": 1,
    "title": "Biased Recommendation Algorithm",
    "description": "Algorithm consistently favored certain demographics in job recommendations, leading to potential discrimination issues. The bias was discovered during regular fairness audits and has been mitigated through retraining with a more diverse dataset.",
    "severity": "Medium",
    "reported_at": "2025-03-15T10:00:00Z"
  },
  {
    "id": 2,
    "title": "LLM Hallucination in Critical Info",
    "description": "LLM provided incorrect safety procedure information when asked about handling hazardous materials. This could have led to dangerous situations if followed. The model has been fine-tuned with additional safety data and warning systems have been implemented.",
    "severity": "High",
    "reported_at": "2025-04-01T14:30:00Z"
  },
  {
    "id": 3,
    "title": "Minor Data Leak via Chatbot",
    "description": "Chatbot inadvertently exposed non-sensitive user metadata in its responses. The issue was identified during routine log analysis. The affected system component has been patched and additional privacy checks have been implemented.",
    "severity": "Low",
    "reported_at": "2025-03-20T09:15:00Z"
  },
  {
    "id": 4,
    "title": "Automated Decision System Failure",
    "description": "An AI-based approval system incorrectly denied valid applications due to a logic error in its decision-making process. The issue affected approximately 120 users over a 48-hour period before being identified and corrected.",
    "severity": "Medium",
    "reported_at": "2025-03-25T11:45:00Z"
  },
  {
    "id": 5,
    "title": "Harmful Content Generation",
    "description": "Text generation model produced harmful content when given certain prompts that bypassed safety filters. The safety mechanisms have been updated and an additional layer of content moderation has been added.",
    "severity": "High",
    "reported_at": "2025-04-05T08:30:00Z"
  }
];