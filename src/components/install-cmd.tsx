'use client';

import { useId, useState } from 'react';
import { CopyButton } from './copy-button';
import { TextTabs } from './text-tabs';

const PMS = ['npm', 'pnpm', 'bun'] as const;

/** The mono one-liner with quiet pm text-tabs and a copy button. */
export function InstallCmd({ className }: { className?: string }) {
  const [pm, setPm] = useState(0);
  const id = useId();
  const cmd = `${PMS[pm]} create wappa-agent my-bot`;
  return (
    <div className={className}>
      <TextTabs
        tabs={PMS}
        active={pm}
        onSelect={setPm}
        label="Package manager"
        idBase={id}
        controls={`${id}-panel`}
        className="-ml-2"
      />
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${pm}`}
        className="mt-1.5 flex items-center gap-3 rounded-btn border border-line bg-surface py-2 pl-3.5 pr-2"
      >
        <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-[13px] text-ink">
          <span aria-hidden className="select-none text-ink-faint">
            ${' '}
          </span>
          {cmd}
        </code>
        <CopyButton text={cmd} label="Copy the create command" />
      </div>
    </div>
  );
}
