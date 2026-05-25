"use client";

import { useState, useTransition } from "react";
import { SettingsDashboardData } from "../types";
import { updateSetting, triggerPasswordResetFlow } from "../actions";
import { Globe, Shield, Activity, Settings as SettingsIcon, Link as LinkIcon, Database, CheckCircle2, Lock, History } from "lucide-react";

export default function SettingsClient({ data }: { data: SettingsDashboardData }) {
  const [activeTab, setActiveTab] = useState<"general" | "seo" | "integrations" | "security" | "audit">("general");

  function getSettingVal(key: string, fallback: string = "") {
    return data.settings.find(s => s.key === key)?.value || fallback;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 space-y-1">
        <TabButton id="general" active={activeTab} setActive={setActiveTab} icon={SettingsIcon} label="General & Brand" />
        <TabButton id="seo" active={activeTab} setActive={setActiveTab} icon={Globe} label="SEO Settings" />
        <TabButton id="integrations" active={activeTab} setActive={setActiveTab} icon={LinkIcon} label="Integrations" />
        <TabButton id="security" active={activeTab} setActive={setActiveTab} icon={Shield} label="Security" />
        <TabButton id="audit" active={activeTab} setActive={setActiveTab} icon={History} label="Audit Logs" />
      </div>

      {/* Content Area */}
      <div className="flex-1 space-y-6">
        {activeTab === "general" && (
          <div className="space-y-6">
            <SettingCard 
              title="Site Name" 
              settingKey="site_name" 
              initialValue={getSettingVal("site_name", "Zoveto")} 
              description="The global name of your application." 
            />
            <SettingCard 
              title="Site Domain" 
              settingKey="site_domain" 
              initialValue={getSettingVal("site_domain", "https://zoveto.com")} 
              description="The primary canonical URL for the site." 
            />
            <SettingCard 
              title="Default Contact Email" 
              settingKey="default_contact_email" 
              initialValue={getSettingVal("default_contact_email", "contact@zoveto.com")} 
              description="Where system inquiries and default forms will route." 
            />
            <SettingCard 
              title="Timezone" 
              settingKey="timezone" 
              initialValue={getSettingVal("timezone", "Asia/Kolkata")} 
              description="Default timezone for rendering charts and logs." 
            />
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-6">
             <SettingCard 
              title="Default Title" 
              settingKey="seo_default_title" 
              initialValue={getSettingVal("seo_default_title")} 
              description="Fallback title tag for pages without one." 
            />
            <SettingCard 
              title="Default Description" 
              settingKey="seo_default_description" 
              initialValue={getSettingVal("seo_default_description")} 
              description="Fallback meta description." 
              multiline
            />
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="space-y-6">
            <div className="rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 flex gap-3">
              <Database className="h-5 w-5 text-blue-400 shrink-0" />
              <p className="text-sm text-blue-300">
                Some integrations are managed securely via environment variables (`.env`). Keys set in ENV cannot be overridden here for security reasons.
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5 mb-8 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-zinc-100">Google Workspace API</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Connect your Google account to fetch live traffic and search performance data for your dashboard.
                </p>
              </div>
              <a 
                href="/dashboard/integrations/google" 
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 whitespace-nowrap"
              >
                Manage Connection
              </a>
            </div>

            <h3 className="text-lg font-medium text-zinc-100 mb-4 mt-8">Environment Integrations</h3>
            <IntegrationCard
              title="Google Analytics (GTM)"
              settingKey="integration_google_analytics"
              initialValue={getSettingVal("integration_google_analytics")}
              envOverride={data.envConfigs.hasGoogleAnalytics}
            />
            <IntegrationCard
              title="Sentry DSN"
              settingKey="integration_sentry_dsn"
              initialValue={getSettingVal("integration_sentry_dsn")}
              envOverride={data.envConfigs.hasSentry}
              isSecret
            />
            <IntegrationCard
              title="PostHog Key"
              settingKey="integration_posthog"
              initialValue={getSettingVal("integration_posthog")}
              envOverride={data.envConfigs.hasPostHog}
              isSecret
            />
            <IntegrationCard
              title="Cloudinary Config URL"
              settingKey="integration_cloudinary_url"
              initialValue={getSettingVal("integration_cloudinary_url")}
              isSecret
            />
            
            <div className="mt-8 border-t border-zinc-800 pt-6">
              <h3 className="text-lg font-medium text-zinc-100 mb-4">Email / SMTP Server</h3>
              <SettingCard title="SMTP Host" settingKey="smtp_host" initialValue={getSettingVal("smtp_host")} />
              <SettingCard title="SMTP User" settingKey="smtp_user" initialValue={getSettingVal("smtp_user")} />
              <IntegrationCard title="SMTP Password" settingKey="smtp_password" initialValue={getSettingVal("smtp_password")} isSecret />
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
             <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="text-lg font-medium text-zinc-100">Admin Account Access</h3>
                <p className="text-sm text-zinc-400 mt-1 mb-4">Request a secure password reset link for the active session.</p>
                <PasswordResetButton />
             </div>
             
             <SettingCard 
              title="Session Timeout (Minutes)" 
              settingKey="security_session_timeout" 
              initialValue={getSettingVal("security_session_timeout", "1440")} 
              description="Automatically log users out after inactivity." 
            />
          </div>
        )}

        {activeTab === "audit" && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-zinc-900/50 text-xs uppercase text-zinc-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Timestamp</th>
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                    <th className="px-6 py-4 font-medium">Entity</th>
                    <th className="px-6 py-4 font-medium">Changes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {data.auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-zinc-900/30">
                      <td className="px-6 py-4 whitespace-nowrap tabular-nums text-xs">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{log.userId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="rounded bg-blue-500/10 px-2 py-1 text-[10px] font-semibold text-blue-400">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-zinc-300">
                        {log.entity} {log.entityId && <span className="text-zinc-600 ml-1">#{log.entityId}</span>}
                      </td>
                      <td className="px-6 py-4 text-xs font-mono">
                        {log.oldValue && log.newValue ? (
                           <div className="flex items-center gap-2">
                              <span className="text-red-400 line-through truncate max-w-[150px] inline-block">{JSON.stringify(log.oldValue)}</span>
                              <span className="text-zinc-600">→</span>
                              <span className="text-green-400 truncate max-w-[150px] inline-block">{JSON.stringify(log.newValue)}</span>
                           </div>
                        ) : log.newValue ? (
                           <span className="text-green-400 truncate max-w-[200px] inline-block">+ {JSON.stringify(log.newValue)}</span>
                        ) : (
                           <span className="text-zinc-600">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {data.auditLogs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">No audit logs found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ id, active, setActive, icon: Icon, label }: any) {
  const isActive = active === id;
  return (
    <button
      onClick={() => setActive(id)}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
        isActive ? "bg-blue-600 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </button>
  );
}

function SettingCard({ title, settingKey, initialValue, description, isSecret = false, multiline = false }: any) {
  const [val, setVal] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    startTransition(async () => {
      await updateSetting(settingKey, val, isSecret);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
      <div className="mb-4">
        <label className="text-sm font-medium text-zinc-200">{title}</label>
        {description && <p className="mt-0.5 text-xs text-zinc-500">{description}</p>}
      </div>
      <div className="flex items-start gap-3">
        {multiline ? (
           <textarea
             value={val}
             onChange={(e) => setVal(e.target.value)}
             className="flex-1 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 placeholder-zinc-700 outline-none focus:border-blue-500 transition-colors"
             rows={3}
           />
        ) : (
          <div className="relative flex-1">
            {isSecret && <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />}
            <input
              type={isSecret && val === "********" ? "password" : "text"}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className={`w-full rounded-md border border-zinc-800 bg-zinc-900 py-2 text-sm text-zinc-300 placeholder-zinc-700 outline-none focus:border-blue-500 transition-colors ${isSecret ? 'pl-9 pr-3' : 'px-3'}`}
            />
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={isPending || val === initialValue}
          className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white disabled:opacity-50 flex items-center gap-2"
        >
          {isPending ? "Saving..." : saved ? <><CheckCircle2 className="h-4 w-4 text-green-600" /> Saved</> : "Save"}
        </button>
      </div>
    </div>
  );
}

function IntegrationCard({ title, settingKey, initialValue, envOverride, isSecret = false }: any) {
  if (envOverride) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5 opacity-75">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-zinc-400">{title}</label>
          <span className="rounded bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-400 uppercase tracking-wider">Configured in ENV</span>
        </div>
        <input disabled value="••••••••••••••••" className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-600 cursor-not-allowed mt-3" />
      </div>
    );
  }

  return <SettingCard title={title} settingKey={settingKey} initialValue={initialValue} isSecret={isSecret} description="Database override (if not set in ENV)" />;
}

function PasswordResetButton() {
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState("");

  function handleReset() {
    startTransition(async () => {
      const res = await triggerPasswordResetFlow("admin@currentsession.com");
      setMsg(res.message || res.error || "");
      setTimeout(() => setMsg(""), 4000);
    });
  }

  return (
     <div className="flex items-center gap-4">
        <button
          onClick={handleReset}
          disabled={isPending}
          className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700 disabled:opacity-50"
        >
          {isPending ? "Requesting..." : "Send Reset Link"}
        </button>
        {msg && <span className="text-sm text-green-400">{msg}</span>}
     </div>
  );
}
