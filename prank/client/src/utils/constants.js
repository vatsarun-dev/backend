export const OFFICE_NAME  = 'Shri Dhanlaxmi Financial Services Pvt. Ltd.';
export const SCHEME_CODE  = 'PDY/GOI/1998-99/XIII-B';
export const OFFICER      = 'Sri Ramprasad Harikant Chaturvedi';
export const TAGLINE      = '21 Seconds Mein Paisa Double';

export const PROCESSING_STEPS = [
  { label: 'Connecting to National Wealth Grid…',    icon: '🏛️', dur: 1400 },
  { label: 'Searching Hidden Investors…',            icon: '🔍', dur: 1300 },
  { label: 'Counting Currency Reserves…',            icon: '💵', dur: 1200 },
  { label: 'Verifying Your Luck Index…',             icon: '🎯', dur: 1100 },
  { label: 'Checking Financial Karma…',              icon: '⭐', dur: 1200 },
  { label: 'Calibrating Money Engine (K-47)…',       icon: '⚙️', dur: 1300 },
  { label: 'Activating Wealth Reactor…',             icon: '🔋', dur: 1100 },
  { label: 'Consulting Internal Astrologer…',        icon: '🌙', dur: 1000 },
  { label: 'Routing Via Reserve Bank (Cousin)…',     icon: '🏦', dur: 1200 },
  { label: 'Dispatching Peon With Envelope…',        icon: '📦', dur: 1100 },
  { label: 'Generating Profit Certificate…',         icon: '📜', dur: 1000 },
  { label: 'Finalising Transfer… Almost There…',     icon: '✅', dur: 1400 },
];

export const FAKE_CALLS = [
  '"Haan ji, paisa double toh hoga, bas thoda wait karo." *click*',
  '"Operator abhi lunch par hain. Please hold. Yeh hold music hai."',
  '"Aapka token number 7,847 hai. Current serving: Token 3."',
  '"Sorry wrong number. Ya actually... sahi number. Ruko."',
  '"Ramprasad ji chai le ke aayenge. Bas 5 minute."',
];

export const REGISTER_ENTRIES = [
  { name: 'Shyamlal Tiwari',     amount: '₹1',   returned: '₹2 (Theoretical)' },
  { name: 'Mrs. Kamla Devi',      amount: '₹1',   returned: '₹2 (Pending)' },
  { name: 'Pappu & Associates',   amount: '₹1',   returned: '₹1 + Hope' },
  { name: 'Sarkari Babu No. 7',   amount: '₹1',   returned: 'Under Review (1999)' },
  { name: 'Anonymous Optimist',   amount: '₹1',   returned: '+100 XP' },
];

export const ERROR_POPUPS = [
  {
    id: 1, delay: 1800,
    title: 'CRITICAL: Money Reactor Failure',
    body:  'Money Reactor (Unit K-47) has EXPLODED.\nSafety protocol activated.\n\nPlease stand back.',
    icon: '💥',
  },
  {
    id: 2, delay: 4000,
    title: 'Staff Notification',
    body:  'Operator Ramprasad Chaturvedi has\nleft the building.\n\nLast seen: Running north.',
    icon: '🏃',
  },
  {
    id: 3, delay: 6200,
    title: 'Profit Re-Routing Notice',
    body:  'Your ₹2 profit has been redirected\nto the Experience Department.\n\nThank you for your optimism.',
    icon: '💡',
  },
];

// ── Aliases for backward-compatibility with v1 components ──
export const APP_NAME   = 'Paisa Double Yojana';
export const DEPT       = 'Ministry of Incredible Finance (Internal Division)';
export const INVESTMENT = '₹1';

// PROCESSING_MESSAGES alias (v1 components use this name)
export const PROCESSING_MESSAGES = PROCESSING_STEPS.map(s => ({
  text:  s.label,
  icon:  s.icon,
  delay: 0, // not used in v2 flow
}));

// Console easter egg messages
// Format: message with %c, then style, alternating
export const CONSOLE_MESSAGES = [
  '%c PAISA DOUBLE YOJANA — DEVELOPER MODE %c You found the secret. Arey wah! %c Ramprasad ji is currently on extended lunch. ',
  'background:#1a3a2a;color:#c8a84b;font-size:16px;font-weight:bold;padding:8px 16px;border:2px solid #c8a84b',
  'background:#0a0a0a;color:#e8c96a;font-size:13px;padding:4px 8px',
  'background:#2c1a0e;color:#f0e6c8;font-size:11px;padding:4px 8px',
];

// Profit keyboard easter egg
export const PROFIT_RESPONSES = [
  '🤑 Profit noted. Operator will call back between 2045–2047.',
  '💼 Ramprasad ji: "Profit toh milega, bas thoda wait karo."',
  '📋 Application received. Token number: ∞. Please take a seat.',
  '🏦 Transfer initiated. Please wait 3–5 business decades.',
];

// Certificate details (v1 Certificate component)
export const CERTIFICATE_DETAILS = {
  number:     'CERT/PDY/1999/00042-X',
  issued:     '15 August 1999',
  valid:      '31 December 2099',
  ministry:   'Ministry of Incredible Finance',
  division:   'Department of Wealth Multiplication (Internal)',
  signatory:  'Joint Secretary, Shri R.H. Chaturvedi (Retd.)',
  stamp:      'APPROVED & CERTIFIED',
  disclaimer: '* Approval granted by internal committee consisting of one person.',
};
