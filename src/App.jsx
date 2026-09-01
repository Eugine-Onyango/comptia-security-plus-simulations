import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Domain1Page from './components/Domain1Page';
import Domain2Page from './components/Domain2Page';
import Domain3Page from './components/Domain3Page';
import Domain4Page from './components/Domain4Page';
import Domain5Page from './components/Domain5Page';
import CiaTriadSim from './components/simulations/CiaTriadSim';
import CertificatesSim from './components/simulations/CertificatesSim';
import EncryptionTechSim from './components/simulations/EncryptionTechSim';
import EncryptingDataSim from './components/simulations/EncryptingDataSim';
import ZeroTrustSim from './components/simulations/ZeroTrustSim';
import AaaFrameworkSim from './components/simulations/AaaFrameworkSim';
import GapAnalysisSim from './components/simulations/GapAnalysisSim';
import PhysicalSecuritySim from './components/simulations/PhysicalSecuritySim';
import DeceptionDisruptionSim from './components/simulations/DeceptionDisruptionSim';
import ChangeManagementSim from './components/simulations/ChangeManagementSim';
import ObfuscationSim from './components/simulations/ObfuscationSim';
import HashingSignaturesSim from './components/simulations/HashingSignaturesSim';
import SecurityControlsMcq from './components/questions/SecurityControlsMcq';
import ThreatVectorsMcq from './components/questions/ThreatVectorsMcq';
import PhishingMcq from './components/questions/PhishingMcq';
import ImpersonationMcq from './components/questions/ImpersonationMcq';
import WateringHoleMcq from './components/questions/WateringHoleMcq';
import SocialMemBufferMcq from './components/questions/SocialMemBufferMcq';
import RaceConditionsMcq from './components/questions/RaceConditionsMcq';
import MaliciousUpdatesMcq from './components/questions/MaliciousUpdatesMcq';
import OsVulnerabilitiesMcq from './components/questions/OsVulnerabilitiesMcq';
import SqlInjectionMcq from './components/questions/SqlInjectionMcq';
import XssMcq from './components/questions/XssMcq';
import HardwareVirtualizationMcq from './components/questions/HardwareVirtualizationMcq';
import SupplyChainMcq from './components/questions/SupplyChainMcq';
import MisconfigurationsMcq from './components/questions/MisconfigurationsMcq';
import MobileVulnerabilitiesMcq from './components/questions/MobileVulnerabilitiesMcq';
import ZeroDayMcq from './components/questions/ZeroDayMcq';
import OverviewMalwareMcq from './components/questions/OverviewMalwareMcq';
import VirusesWormsMcq from './components/questions/VirusesWormsMcq';
import OtherMalwareTypesMcq from './components/questions/OtherMalwareTypesMcq';
import PhysicalAttacksMcq from './components/questions/PhysicalAttacksMcq';
import DosMcq from './components/questions/DosMcq';
import DnsAttacksMcq from './components/questions/DnsAttacksMcq';
import WirelessAttacksMcq from './components/questions/WirelessAttacksMcq';
import OnPathAttacksMcq from './components/questions/OnPathAttacksMcq';
import ReplayAttacksMcq from './components/questions/ReplayAttacksMcq';
import MaliciousCodeMcq from './components/questions/MaliciousCodeMcq';
import ApplicationAttacksMcq from './components/questions/ApplicationAttacksMcq';
import CryptographicAttacksMcq from './components/questions/CryptographicAttacksMcq';
import PasswordAttacksMcq from './components/questions/PasswordAttacksMcq';
import IndicatorsOfCompromiseMcq from './components/questions/IndicatorsOfCompromiseMcq';
import SegmentationAccessControlMcq from './components/questions/SegmentationAccessControlMcq';
import MitigationTechniquesMcq from './components/questions/MitigationTechniquesMcq';
import HardeningTechniquesMcq from './components/questions/HardeningTechniquesMcq';
import SecureBaselinesMcq from './components/questions/SecureBaselinesMcq';
import HardeningTargetsMcq from './components/questions/HardeningTargetsMcq';
import SecuringWirelessMobileMcq from './components/questions/SecuringWirelessMobileMcq';
import WirelessSecuritySettingsMcq from './components/questions/WirelessSecuritySettingsMcq';
import ApplicationSecurityMcq from './components/questions/ApplicationSecurityMcq';
import AssetManagementMcq from './components/questions/AssetManagementMcq';
import VulnerabilityScanningMcq from './components/questions/VulnerabilityScanningMcq';
import ThreatIntelligenceMcq from './components/questions/ThreatIntelligenceMcq';
import PenetrationTestingMcq from './components/questions/PenetrationTestingMcq';
import PentestProcessDisclosureMcq from './components/questions/PentestProcessDisclosureMcq';
import AnalyzingVulnerabilitiesMcq from './components/questions/AnalyzingVulnerabilitiesMcq';
import VulnerabilityRemediationMcq from './components/questions/VulnerabilityRemediationMcq';
import SecurityMonitoringMcq from './components/questions/SecurityMonitoringMcq';
import SecurityToolsMcq from './components/questions/SecurityToolsMcq';
import FirewallsMcq from './components/questions/FirewallsMcq';
import WebFilteringMcq from './components/questions/WebFilteringMcq';
import OsSecurityMcq from './components/questions/OsSecurityMcq';
import SecureProtocolsMcq from './components/questions/SecureProtocolsMcq';
import EmailSecurityMcq from './components/questions/EmailSecurityMcq';
import EndpointSecurityMcq from './components/questions/EndpointSecurityMcq';
import MonitoringDataMcq from './components/questions/MonitoringDataMcq';
import IamMcq from './components/questions/IamMcq';
import FederatedIamMcq from './components/questions/FederatedIamMcq';
import AccessControlsMcq from './components/questions/AccessControlsMcq';
import MfaMcq from './components/questions/MfaMcq';
import PasswordSecurityMcq from './components/questions/PasswordSecurityMcq';
import ScriptingAutomationMcq from './components/questions/ScriptingAutomationMcq';
import IncidentResponseMcq from './components/questions/IncidentResponseMcq';
import IncidentPlanningMcq from './components/questions/IncidentPlanningMcq';
import DigitalForensicsMcq from './components/questions/DigitalForensicsMcq';
import LogDataMcq from './components/questions/LogDataMcq';
import CloudInfrastructuresSim from './components/simulations/CloudInfrastructuresSim';
import NetworkConceptsSim from './components/simulations/NetworkConceptsSim';
import OtherInfraSim from './components/simulations/OtherInfraSim';
import InfraConsiderationsSim from './components/simulations/InfraConsiderationsSim';
import SecureInfraSim from './components/simulations/SecureInfraSim';
import AaaServersSim from './components/simulations/AaaServersSim';
import NetworkAppliancesSim from './components/simulations/NetworkAppliancesSim';
import FirewallTypesSim from './components/simulations/FirewallTypesSim';
import SecureCommSim from './components/simulations/SecureCommSim';
import DataTypesSim from './components/simulations/DataTypesSim';
import StatesOfDataSim from './components/simulations/StatesOfDataSim';
import ProtectingDataSim from './components/simulations/ProtectingDataSim';
import ResiliencySim from './components/simulations/ResiliencySim';
import SecurityPoliciesSim from './components/simulations/SecurityPoliciesSim';
import SecurityStandardsSim from './components/simulations/SecurityStandardsSim';
import SecurityProceduresSim from './components/simulations/SecurityProceduresSim';
import SecurityConsiderationsSim from './components/simulations/SecurityConsiderationsSim';
import DataRolesSim from './components/simulations/DataRolesSim';
import RiskManagementSim from './components/simulations/RiskManagementSim';
import RiskAnalysisSim from './components/simulations/RiskAnalysisSim';
import RiskStrategySim from './components/simulations/RiskStrategySim';
import BiaSim from './components/simulations/BiaSim';
import ComplianceSim from './components/simulations/ComplianceSim';
import PrivacySim from './components/simulations/PrivacySim';
import UserTrainingSim from './components/simulations/UserTrainingSim';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'domain1', 'domain2', 'domain3', 'domain4', 'domain5', ...
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div class="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      
      {/* Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main View Switcher */}
      <main class="flex-1 pb-16">
        {currentView === 'home' && (
          <HomePage
            onSelectDomain={(domainId) => {
              if (domainId === 'domain1') setCurrentView('domain1');
              if (domainId === 'domain2') setCurrentView('domain2');
              if (domainId === 'domain3') setCurrentView('domain3');
              if (domainId === 'domain4') setCurrentView('domain4');
              if (domainId === 'domain5') setCurrentView('domain5');
            }}
          />
        )}

        {currentView === 'domain1' && (
          <Domain1Page
            onBack={() => setCurrentView('home')}
            onSelectTopic={(topicId) => {
              if (topicId === 'cia') setCurrentView('cia');
              if (topicId === 'certificates') setCurrentView('certificates');
              if (topicId === 'encryption_tech') setCurrentView('encryption_tech');
              if (topicId === 'encrypting_data') setCurrentView('encrypting_data');
              if (topicId === 'zero_trust') setCurrentView('zero_trust');
              if (topicId === 'aaa_framework') setCurrentView('aaa_framework');
              if (topicId === 'gap_analysis') setCurrentView('gap_analysis');
              if (topicId === 'physical_security') setCurrentView('physical_security');
              if (topicId === 'deception_disruption') setCurrentView('deception_disruption');
              if (topicId === 'change_management') setCurrentView('change_management');
              if (topicId === 'obfuscation') setCurrentView('obfuscation');
              if (topicId === 'hashing_signatures') setCurrentView('hashing_signatures');
              if (topicId === 'security_controls_mcq') setCurrentView('security_controls_mcq');
            }}
          />
        )}

        {currentView === 'domain2' && (
          <Domain2Page
            onBack={() => setCurrentView('home')}
            onSelectTopic={(topicId) => {
              if (topicId === 'threat_vectors_mcq') setCurrentView('threat_vectors_mcq');
              if (topicId === 'phishing_mcq') setCurrentView('phishing_mcq');
              if (topicId === 'impersonation_mcq') setCurrentView('impersonation_mcq');
              if (topicId === 'watering_hole_mcq') setCurrentView('watering_hole_mcq');
              if (topicId === 'social_mem_buffer_mcq') setCurrentView('social_mem_buffer_mcq');
              if (topicId === 'race_conditions_mcq') setCurrentView('race_conditions_mcq');
              if (topicId === 'malicious_updates_mcq') setCurrentView('malicious_updates_mcq');
              if (topicId === 'os_vulnerabilities_mcq') setCurrentView('os_vulnerabilities_mcq');
              if (topicId === 'sql_injection_mcq') setCurrentView('sql_injection_mcq');
              if (topicId === 'xss_mcq') setCurrentView('xss_mcq');
              if (topicId === 'hardware_virtualization_mcq') setCurrentView('hardware_virtualization_mcq');
              if (topicId === 'supply_chain_mcq') setCurrentView('supply_chain_mcq');
              if (topicId === 'misconfigurations_mcq') setCurrentView('misconfigurations_mcq');
              if (topicId === 'mobile_vulnerabilities_mcq') setCurrentView('mobile_vulnerabilities_mcq');
              if (topicId === 'zero_day_mcq') setCurrentView('zero_day_mcq');
              if (topicId === 'overview_malware_mcq') setCurrentView('overview_malware_mcq');
              if (topicId === 'viruses_worms_mcq') setCurrentView('viruses_worms_mcq');
              if (topicId === 'other_malware_types_mcq') setCurrentView('other_malware_types_mcq');
              if (topicId === 'physical_attacks_mcq') setCurrentView('physical_attacks_mcq');
              if (topicId === 'dos_mcq') setCurrentView('dos_mcq');
              if (topicId === 'dns_attacks_mcq') setCurrentView('dns_attacks_mcq');
              if (topicId === 'wireless_attacks_mcq') setCurrentView('wireless_attacks_mcq');
              if (topicId === 'on_path_attacks_mcq') setCurrentView('on_path_attacks_mcq');
              if (topicId === 'replay_attacks_mcq') setCurrentView('replay_attacks_mcq');
              if (topicId === 'malicious_code_mcq') setCurrentView('malicious_code_mcq');
              if (topicId === 'application_attacks_mcq') setCurrentView('application_attacks_mcq');
              if (topicId === 'cryptographic_attacks_mcq') setCurrentView('cryptographic_attacks_mcq');
              if (topicId === 'password_attacks_mcq') setCurrentView('password_attacks_mcq');
              if (topicId === 'indicators_of_compromise_mcq') setCurrentView('indicators_of_compromise_mcq');
              if (topicId === 'segmentation_access_control_mcq') setCurrentView('segmentation_access_control_mcq');
              if (topicId === 'mitigation_techniques_mcq') setCurrentView('mitigation_techniques_mcq');
              if (topicId === 'hardening_techniques_mcq') setCurrentView('hardening_techniques_mcq');
            }}
          />
        )}

        {currentView === 'domain3' && (
          <Domain3Page
            onBack={() => setCurrentView('home')}
            onSelectTopic={(topicId) => {
              if (topicId === 'cloud_infrastructures') setCurrentView('cloud_infrastructures');
              if (topicId === 'network_concepts') setCurrentView('network_concepts');
              if (topicId === 'other_infra') setCurrentView('other_infra');
              if (topicId === 'infra_considerations') setCurrentView('infra_considerations');
              if (topicId === 'secure_infra') setCurrentView('secure_infra');
              if (topicId === 'aaa_servers') setCurrentView('aaa_servers');
              if (topicId === 'network_appliances') setCurrentView('network_appliances');
              if (topicId === 'firewall_types') setCurrentView('firewall_types');
              if (topicId === 'secure_comm') setCurrentView('secure_comm');
              if (topicId === 'data_types') setCurrentView('data_types');
              if (topicId === 'states_of_data') setCurrentView('states_of_data');
              if (topicId === 'protecting_data') setCurrentView('protecting_data');
              if (topicId === 'resiliency') setCurrentView('resiliency');
            }}
          />
        )}

        {currentView === 'domain4' && (
          <Domain4Page
            onBack={() => setCurrentView('home')}
            onSelectTopic={(topicId) => {
              if (topicId === 'secure_baselines_mcq') setCurrentView('secure_baselines_mcq');
              if (topicId === 'hardening_targets_mcq') setCurrentView('hardening_targets_mcq');
              if (topicId === 'securing_wireless_mobile_mcq') setCurrentView('securing_wireless_mobile_mcq');
              if (topicId === 'wireless_security_settings_mcq') setCurrentView('wireless_security_settings_mcq');
              if (topicId === 'application_security_mcq') setCurrentView('application_security_mcq');
              if (topicId === 'asset_management_mcq') setCurrentView('asset_management_mcq');
              if (topicId === 'vulnerability_scanning_mcq') setCurrentView('vulnerability_scanning_mcq');
              if (topicId === 'threat_intelligence_mcq') setCurrentView('threat_intelligence_mcq');
              if (topicId === 'penetration_testing_mcq') setCurrentView('penetration_testing_mcq');
              if (topicId === 'pentest_process_disclosure_mcq') setCurrentView('pentest_process_disclosure_mcq');
              if (topicId === 'analyzing_vulnerabilities_mcq') setCurrentView('analyzing_vulnerabilities_mcq');
              if (topicId === 'vulnerability_remediation_mcq') setCurrentView('vulnerability_remediation_mcq');
              if (topicId === 'security_monitoring_mcq') setCurrentView('security_monitoring_mcq');
              if (topicId === 'security_tools_mcq') setCurrentView('security_tools_mcq');
              if (topicId === 'firewalls_mcq') setCurrentView('firewalls_mcq');
              if (topicId === 'web_filtering_mcq') setCurrentView('web_filtering_mcq');
              if (topicId === 'os_security_mcq') setCurrentView('os_security_mcq');
              if (topicId === 'secure_protocols_mcq') setCurrentView('secure_protocols_mcq');
              if (topicId === 'email_security_mcq') setCurrentView('email_security_mcq');
              if (topicId === 'endpoint_security_mcq') setCurrentView('endpoint_security_mcq');
              if (topicId === 'monitoring_data_mcq') setCurrentView('monitoring_data_mcq');
              if (topicId === 'iam_mcq') setCurrentView('iam_mcq');
              if (topicId === 'federated_iam_mcq') setCurrentView('federated_iam_mcq');
              if (topicId === 'access_controls_mcq') setCurrentView('access_controls_mcq');
              if (topicId === 'mfa_mcq') setCurrentView('mfa_mcq');
              if (topicId === 'password_security_mcq') setCurrentView('password_security_mcq');
              if (topicId === 'scripting_automation_mcq') setCurrentView('scripting_automation_mcq');
              if (topicId === 'incident_response_mcq') setCurrentView('incident_response_mcq');
              if (topicId === 'incident_planning_mcq') setCurrentView('incident_planning_mcq');
              if (topicId === 'digital_forensics_mcq') setCurrentView('digital_forensics_mcq');
              if (topicId === 'log_data_mcq') setCurrentView('log_data_mcq');
            }}
          />
        )}

        {currentView === 'domain5' && (
          <Domain5Page
            onBack={() => setCurrentView('home')}
            onSelectTopic={(topicId) => {
              if (topicId === 'security_policies') setCurrentView('security_policies');
              if (topicId === 'security_standards') setCurrentView('security_standards');
              if (topicId === 'security_procedures') setCurrentView('security_procedures');
              if (topicId === 'security_considerations') setCurrentView('security_considerations');
              if (topicId === 'data_roles') setCurrentView('data_roles');
              if (topicId === 'risk_management') setCurrentView('risk_management');
              if (topicId === 'risk_analysis') setCurrentView('risk_analysis');
              if (topicId === 'risk_strategies') setCurrentView('risk_strategies');
              if (topicId === 'bia') setCurrentView('bia');
              if (topicId === 'compliance') setCurrentView('compliance');
              if (topicId === 'privacy') setCurrentView('privacy');
              if (topicId === 'user_training') setCurrentView('user_training');
            }}
          />
        )}

        {currentView === 'threat_vectors_mcq' && (
          <ThreatVectorsMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'phishing_mcq' && (
          <PhishingMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'impersonation_mcq' && (
          <ImpersonationMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'watering_hole_mcq' && (
          <WateringHoleMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'social_mem_buffer_mcq' && (
          <SocialMemBufferMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'race_conditions_mcq' && (
          <RaceConditionsMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'malicious_updates_mcq' && (
          <MaliciousUpdatesMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'os_vulnerabilities_mcq' && (
          <OsVulnerabilitiesMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'sql_injection_mcq' && (
          <SqlInjectionMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'xss_mcq' && (
          <XssMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'hardware_virtualization_mcq' && (
          <HardwareVirtualizationMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'supply_chain_mcq' && (
          <SupplyChainMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'misconfigurations_mcq' && (
          <MisconfigurationsMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'mobile_vulnerabilities_mcq' && (
          <MobileVulnerabilitiesMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'zero_day_mcq' && (
          <ZeroDayMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'overview_malware_mcq' && (
          <OverviewMalwareMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'viruses_worms_mcq' && (
          <VirusesWormsMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'other_malware_types_mcq' && (
          <OtherMalwareTypesMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'physical_attacks_mcq' && (
          <PhysicalAttacksMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'dos_mcq' && (
          <DosMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'dns_attacks_mcq' && (
          <DnsAttacksMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'wireless_attacks_mcq' && (
          <WirelessAttacksMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'on_path_attacks_mcq' && (
          <OnPathAttacksMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'replay_attacks_mcq' && (
          <ReplayAttacksMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'malicious_code_mcq' && (
          <MaliciousCodeMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'application_attacks_mcq' && (
          <ApplicationAttacksMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'cryptographic_attacks_mcq' && (
          <CryptographicAttacksMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'password_attacks_mcq' && (
          <PasswordAttacksMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'indicators_of_compromise_mcq' && (
          <IndicatorsOfCompromiseMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'segmentation_access_control_mcq' && (
          <SegmentationAccessControlMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'mitigation_techniques_mcq' && (
          <MitigationTechniquesMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'hardening_techniques_mcq' && (
          <HardeningTechniquesMcq
            onBack={() => setCurrentView('domain2')}
          />
        )}

        {currentView === 'secure_baselines_mcq' && (
          <SecureBaselinesMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'hardening_targets_mcq' && (
          <HardeningTargetsMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'securing_wireless_mobile_mcq' && (
          <SecuringWirelessMobileMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'wireless_security_settings_mcq' && (
          <WirelessSecuritySettingsMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'application_security_mcq' && (
          <ApplicationSecurityMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'asset_management_mcq' && (
          <AssetManagementMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'vulnerability_scanning_mcq' && (
          <VulnerabilityScanningMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'threat_intelligence_mcq' && (
          <ThreatIntelligenceMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'penetration_testing_mcq' && (
          <PenetrationTestingMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'pentest_process_disclosure_mcq' && (
          <PentestProcessDisclosureMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'analyzing_vulnerabilities_mcq' && (
          <AnalyzingVulnerabilitiesMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'vulnerability_remediation_mcq' && (
          <VulnerabilityRemediationMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'security_monitoring_mcq' && (
          <SecurityMonitoringMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'security_tools_mcq' && (
          <SecurityToolsMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'firewalls_mcq' && (
          <FirewallsMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'web_filtering_mcq' && (
          <WebFilteringMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'os_security_mcq' && (
          <OsSecurityMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'secure_protocols_mcq' && (
          <SecureProtocolsMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'email_security_mcq' && (
          <EmailSecurityMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'endpoint_security_mcq' && (
          <EndpointSecurityMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'monitoring_data_mcq' && (
          <MonitoringDataMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'iam_mcq' && (
          <IamMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'federated_iam_mcq' && (
          <FederatedIamMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'access_controls_mcq' && (
          <AccessControlsMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'mfa_mcq' && (
          <MfaMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'password_security_mcq' && (
          <PasswordSecurityMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'scripting_automation_mcq' && (
          <ScriptingAutomationMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'incident_response_mcq' && (
          <IncidentResponseMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'incident_planning_mcq' && (
          <IncidentPlanningMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'digital_forensics_mcq' && (
          <DigitalForensicsMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'log_data_mcq' && (
          <LogDataMcq
            onBack={() => setCurrentView('domain4')}
          />
        )}

        {currentView === 'security_controls_mcq' && (
          <SecurityControlsMcq
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'cia' && (
          <CiaTriadSim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'certificates' && (
          <CertificatesSim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'encryption_tech' && (
          <EncryptionTechSim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'encrypting_data' && (
          <EncryptingDataSim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'zero_trust' && (
          <ZeroTrustSim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'aaa_framework' && (
          <AaaFrameworkSim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'gap_analysis' && (
          <GapAnalysisSim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'physical_security' && (
          <PhysicalSecuritySim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'deception_disruption' && (
          <DeceptionDisruptionSim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'change_management' && (
          <ChangeManagementSim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'obfuscation' && (
          <ObfuscationSim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'hashing_signatures' && (
          <HashingSignaturesSim
            onBack={() => setCurrentView('domain1')}
          />
        )}

        {currentView === 'cloud_infrastructures' && (
          <CloudInfrastructuresSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'network_concepts' && (
          <NetworkConceptsSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'other_infra' && (
          <OtherInfraSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'infra_considerations' && (
          <InfraConsiderationsSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'secure_infra' && (
          <SecureInfraSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'aaa_servers' && (
          <AaaServersSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'network_appliances' && (
          <NetworkAppliancesSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'firewall_types' && (
          <FirewallTypesSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'secure_comm' && (
          <SecureCommSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'data_types' && (
          <DataTypesSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'states_of_data' && (
          <StatesOfDataSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'protecting_data' && (
          <ProtectingDataSim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'resiliency' && (
          <ResiliencySim
            onBack={() => setCurrentView('domain3')}
          />
        )}

        {currentView === 'security_policies' && (
          <SecurityPoliciesSim
            onBack={() => setCurrentView('domain5')}
          />
        )}

        {currentView === 'security_standards' && (
          <SecurityStandardsSim
            onBack={() => setCurrentView('domain5')}
          />
        )}

        {currentView === 'security_procedures' && (
          <SecurityProceduresSim
            onBack={() => setCurrentView('domain5')}
          />
        )}

        {currentView === 'security_considerations' && (
          <SecurityConsiderationsSim
            onBack={() => setCurrentView('domain5')}
          />
        )}

        {currentView === 'data_roles' && (
          <DataRolesSim
            onBack={() => setCurrentView('domain5')}
          />
        )}

        {currentView === 'risk_management' && (
          <RiskManagementSim
            onBack={() => setCurrentView('domain5')}
          />
        )}

        {currentView === 'risk_analysis' && (
          <RiskAnalysisSim
            onBack={() => setCurrentView('domain5')}
          />
        )}

        {currentView === 'risk_strategies' && (
          <RiskStrategySim
            onBack={() => setCurrentView('domain5')}
          />
        )}

        {currentView === 'bia' && (
          <BiaSim
            onBack={() => setCurrentView('domain5')}
          />
        )}

        {currentView === 'compliance' && (
          <ComplianceSim
            onBack={() => setCurrentView('domain5')}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacySim
            onBack={() => setCurrentView('domain5')}
          />
        )}

        {currentView === 'user_training' && (
          <UserTrainingSim
            onBack={() => setCurrentView('domain5')}
          />
        )}
      </main>

      {/* Footer */}
      <footer class="bg-white border-t border-amber-200 py-6 text-center text-xs text-slate-500 font-medium">
        <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>CompTIA Security+ SY0-701 Interactive Acronym Playground & Exam Practice</span>
          <span class="text-amber-700 font-bold">Made with ❤️ for Easy Learning</span>
        </div>
      </footer>

    </div>
  );
}
