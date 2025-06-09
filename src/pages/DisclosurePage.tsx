import React from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const DisclosurePage: React.FC = () => {
  return (
    <LegalPageLayout title="Risk Disclosure Statement">
      <p className="mb-4">
        Last Updated: May 2025
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">General Awareness</h2>
      <p className="mb-4">
        This segment discusses the inherent risks related to Virtual Assets, the Platform and using the Services. It's not an exhaustive list, so you should carefully assess whether our Services align with your needs and circumstances. By accessing and using our Platform, you acknowledge and accept these risks. We operate as a technology platform and where regulated services are involved, they are provided by third-party service providers.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">No Guarantee of Performance</h2>
      <p className="mb-4">
        Our Services are provided on an "as is" and "as available" basis. We do not guarantee the uninterrupted operation, security, or accuracy of our Platform. Past performance of any financial or technological service does not indicate future results.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Legal Considerations</h2>
      <p className="mb-4">
        The Services are subject to evolving regulatory frameworks in multiple jurisdictions. Changes in laws, regulations, or enforcement actions may impact the availability, legality, or functionality of our services. You are responsible for understanding and complying with applicable legal requirements.
      </p>
      <p className="mb-4">
        Further, regulatory environment concerning cryptocurrencies and other Virtual Assets continues to develop. The application and interpretation of existing laws and regulations are often largely untested and there is a lack of certainty as to how they will be applied. New laws and regulations will be promulgated in the future that apply to blockchain technology and Virtual Assets, and related services providers, and no assurance can be given that any such changes will not adversely affect Virtual Assets generally or the Services.
      </p>
      <p className="mb-4">
        The legal status of Virtual Assets varies significantly across jurisdictions. Virtual Assets are different to electronic money and are not regulated in the same way as regular currency. They might be prohibited or heavily regulated in certain areas, and you are solely responsible for understanding and adhering to any such laws at your own risk and expense. We do not endorse or take a stance on the legal status of any Virtual Assets. You are encouraged to conduct your own research and understand the legal implications of Virtual Assets. Your use of Virtual Assets through our Services is at your own risk, and you should be aware of and prepared to accept these risks.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Understanding Virtual Assets Risks</h2>
      <p className="mb-4">
        The price of Virtual Assets can be highly unpredictable and volatile. There's a possibility they might become valueless in the future. Trading or holding Virtual Assets involves substantial risks, including potential severe losses. Valuing them can be challenging due to unpredictable trading patterns and unclear fundamentals. You should carefully consider if trading or holding Virtual Assets aligns with your financial situation and risk tolerance. Given the inherent risks in Virtual Assets markets and the influence of technological and international market factors, we cannot assure the ongoing availability of any particular Virtual Assets as part of the Services. The Company retains the right to discontinue offering trades in certain Virtual Assets.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Financial and Transaction Risks</h2>
      <p className="mb-4">
        Transactions conducted through our Platform may be subject to market fluctuations, transaction failures, or delays. We do not control third-party service providers, including payment processors or banking partners, and are not liable for their actions or failures.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Operational Risks</h2>
      <p className="mb-4">
        As a startup, we may experience operational disruptions, system outages, or unforeseen challenges that impact service continuity. We do not assume liability for losses arising from such events.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Funds</h2>
      <p className="mb-4">
        In case of failure, bankruptcy or liquidation, please be aware that you may not be entitled to protection under consumer protection laws in your local jurisdiction. As a result there is a possibility that your funds or Virtual Assets may not be recoverable.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Accuracy of information</h2>
      <p className="mb-4">
        While we endeavour to keep the information displayed on the Services as accurate as possible, there is a risk that this may not be correct, complete, or updated.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Security and Cybersecurity Risks</h2>
      <p className="mb-4">
        Malicious individuals, groups or organisations may attempt to interfere with the Platform in a variety of ways, including, but not limited to, malware attacks, denial of service attacks, coordinated attacks, account takeovers and submitting fake transactions (including spoofing) which could negatively affect the operation of the Platform, or the availability of the Services. With the increased use of technologies and the dependence on computer systems to perform necessary business functions, Virtual Assets and Services are susceptible to operational and information security risks. In general, cyber incidents can result from deliberate attacks or unintentional events. Cyberattacks include but are not limited to gaining unauthorized access to digital systems for purposes of misappropriating assets or sensitive information, corrupting data, or causing operational disruption. Cyberattacks may also be carried out in a manner that does not require gaining unauthorized access, such as causing denial of service attacks on infrastructure. While we implement security measures to protect user data and transactions, cyber threats such as hacking, phishing, or system vulnerabilities may result in data breaches, unauthorized transactions, or loss of funds. Cyber security failures or breaches of the third party service providers (including, but not limited to, software providers, cloud services providers, index providers, the administrator and transfer agent) could have a negative impact on Virtual Assets and the Services.
      </p>
      <p className="mb-4">
        It is your responsibility to ensure (i) that your access credentials are kept secure and confidential, including your email, username, and password, as well as access to or use of any two factor authentication hardware, software, or secret and (ii) the security and integrity of any systems (both hardware and software) or services that you use to access the Services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Use of AI Chatbot</h2>
      <p className="mb-4">
        Our Platform includes access to an AI-powered chatbot that is currently in its pilot phase and under continuous development. The chatbot may provide information that is inaccurate, outdated, or incomplete. You should not rely solely on the chatbot for decision-making, particularly regarding financial, legal, or regulatory matters. We do not accept liability for any consequences resulting from reliance on information provided by the chatbot.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">No Financial or Investment Advice</h2>
      <p className="mb-4">
        Our services do not constitute financial, investment, or legal advice. You should conduct independent research or consult a qualified professional before making financial decisions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Acknowledgement and Acceptance of Risks</h2>
      <p className="mb-4">
        By using our Services and the Platform, you acknowledge that you have read, understood, and accepted this Risk Disclosure Statement. You assume full responsibility for any risks associated with our Platform and the Services and agree that we shall not be liable for any losses incurred.
      </p>
    </LegalPageLayout>
  );
};

export default DisclosurePage;
