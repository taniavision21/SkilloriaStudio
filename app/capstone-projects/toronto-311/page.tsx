import Link from 'next/link';
import type { Metadata } from 'next';
import data from '@/public/data/toronto-311.json';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Toronto 311 Service Requests | Skilloria Studio',
  description: 'Explore Toronto 311 request volumes, current status, and ward-level patterns using City of Toronto Open Data.',
};

const numberFormat = new Intl.NumberFormat('en-CA');
const percentFormat = new Intl.NumberFormat('en-CA', { style: 'percent', maximumFractionDigits: 1 });

function monthLabel(value: string) {
  return new Intl.DateTimeFormat('en-CA', { month: 'short', timeZone: 'UTC' }).format(
    new Date(`${value}-01T00:00:00Z`),
  );
}

function statusColor(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === 'completed' || normalized === 'closed') return styles.complete;
  if (normalized.includes('cancel')) return styles.cancelled;
  if (normalized === 'new' || normalized.includes('progress') || normalized === 'initiated') {
    return styles.active;
  }
  return styles.other;
}

export default function Toronto311Page() {
  const { metrics } = data;
  const peakMonth = Math.max(...data.monthly.map((item) => item.requests), 1);
  const peakWard = Math.max(...data.wards.slice(0, 10).map((item) => item.requests), 1);
  const peakType = Math.max(...data.requestTypes.slice(0, 8).map((item) => item.requests), 1);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Civic data / Toronto Open Data</p>
            <h1>Toronto 311</h1>
            <p className={styles.intro}>
              A ward-level view of customer-initiated service requests, their volume, and their current status.
            </p>
          </div>
          <div className={styles.meta}>
            <span>{data.source.year} year to date</span>
            <span>Source updated {data.source.resourceUpdatedAt?.slice(0, 10) ?? 'date unavailable'}</span>
          </div>
        </header>

        <section className={styles.metrics} aria-label="Key figures">
          <article className={styles.metric}>
            <span className={styles.metricLabel}>Requests logged</span>
            <strong>{numberFormat.format(metrics.totalRequests)}</strong>
            <span className={styles.metricNote}>In the {data.source.year} source file</span>
          </article>
          <article className={styles.metric}>
            <span className={styles.metricLabel}>Completed or closed</span>
            <strong>{percentFormat.format(metrics.completedShare)}</strong>
            <span className={styles.metricNote}>{numberFormat.format(metrics.completedRequests)} requests</span>
          </article>
          <article className={styles.metric}>
            <span className={styles.metricLabel}>Active at snapshot</span>
            <strong>{numberFormat.format(metrics.activeRequests)}</strong>
            <span className={styles.metricNote}>New or in progress</span>
          </article>
          <article className={styles.metric}>
            <span className={styles.metricLabel}>Cancelled</span>
            <strong>{numberFormat.format(metrics.canceledRequests)}</strong>
            <span className={styles.metricNote}>Current status in source file</span>
          </article>
        </section>

        <div className={styles.primaryGrid}>
          <section className={styles.panel} aria-labelledby="monthly-heading">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Creation month</p>
                <h2 id="monthly-heading">Request volume</h2>
              </div>
              <span className={styles.unit}>Requests</span>
            </div>
            <ul className={styles.monthlyChart}>
              {data.monthly.map((item) => {
                const remaining = item.requests - item.completed;
                const barHeight = (item.requests / peakMonth) * 100;
                const completedHeight = item.requests ? (item.completed / item.requests) * 100 : 0;

                return (
                  <li
                    className={styles.monthColumn}
                    key={item.month}
                    aria-label={`${monthLabel(item.month)}: ${numberFormat.format(item.requests)} requests, ${numberFormat.format(item.completed)} currently completed or closed`}
                  >
                    <span className={styles.monthCount}>{numberFormat.format(item.requests)}</span>
                    <div className={styles.chartTrack}>
                      <div className={styles.stackedBar} style={{ height: `${barHeight}%` }}>
                        <span className={styles.remainingSegment} style={{ height: `${100 - completedHeight}%` }} />
                        <span className={styles.completeSegment} style={{ height: `${completedHeight}%` }} />
                      </div>
                    </div>
                    <time className={styles.monthLabel} dateTime={item.month}>{monthLabel(item.month)}</time>
                    <span className={styles.srOnly}>{numberFormat.format(remaining)} not currently completed or closed</span>
                  </li>
                );
              })}
            </ul>
            <div className={styles.legend}>
              <span><i className={styles.legendComplete} />Completed or closed now</span>
              <span><i className={styles.legendRemaining} />Other current statuses</span>
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="status-heading">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Latest published status</p>
                <h2 id="status-heading">Status mix</h2>
              </div>
              <span className={styles.unit}>Requests</span>
            </div>
            <ul className={styles.statusList}>
              {data.statuses.map((item) => (
                <li className={styles.statusRow} key={item.name}>
                  <div className={styles.rowLabel}>
                    <span>{item.name}</span>
                    <strong>{numberFormat.format(item.requests)}</strong>
                  </div>
                  <div className={styles.track}>
                    <span
                      className={`${styles.fill} ${statusColor(item.name)}`}
                      style={{ width: `${(item.requests / metrics.totalRequests) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.secondaryGrid}>
          <section className={styles.panel} aria-labelledby="ward-heading">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Geography</p>
                <h2 id="ward-heading">Top wards by request count</h2>
              </div>
              <span className={styles.unit}>Top 10</span>
            </div>
            <RankedList items={data.wards.slice(0, 10)} peak={peakWard} />
            <p className={styles.chartNote}>Counts are not adjusted for ward population.</p>
          </section>

          <section className={styles.panel} aria-labelledby="type-heading">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Service demand</p>
                <h2 id="type-heading">Most common request types</h2>
              </div>
              <span className={styles.unit}>Top 8</span>
            </div>
            <RankedList items={data.requestTypes.slice(0, 8)} peak={peakType} />
          </section>
        </div>

        <aside className={styles.methodology}>
          <div>
            <p className={styles.eyebrow}>Source and methodology</p>
            <p>{data.source.scopeNote} Monthly totals are grouped by creation date; status reflects the latest published snapshot.</p>
          </div>
          <div>
            <p className={styles.eyebrow}>Resolution time</p>
            <p>{data.source.resolutionNote}</p>
          </div>
          <Link href={data.source.datasetUrl} target="_blank" rel="noreferrer">
            View City of Toronto dataset
          </Link>
        </aside>

        <footer className={styles.backLink}>
          <Link href="/capstone-projects">Back to capstone projects</Link>
        </footer>
      </div>
    </div>
  );
}

function RankedList({ items, peak }: { items: typeof data.wards; peak: number }) {
  return (
    <ol className={styles.rankedList}>
      {items.map((item) => (
        <li className={styles.rankRow} key={item.name}>
          <div className={styles.rowLabel}>
            <span>{item.name}</span>
            <strong>{numberFormat.format(item.requests)}</strong>
          </div>
          <div className={styles.track}>
            <span className={`${styles.fill} ${styles.rankFill}`} style={{ width: `${(item.requests / peak) * 100}%` }} />
          </div>
        </li>
      ))}
    </ol>
  );
}