// src/components/Admin/Podcasts/PodcastStats.jsx
import { useQuery } from '@tanstack/react-query';
import { getPodcastStats } from '../../../services/podcastApi';

const PodcastStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['podcast-stats'],
    queryFn: getPodcastStats,
  });

  if (isLoading) return <div>Loading stats...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">Total Podcasts</h3>
        <p className="text-2xl font-bold">{stats?.totalPodcasts || 0}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">Total Views</h3>
        <p className="text-2xl font-bold">{stats?.totalViews || 0}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">Featured Podcasts</h3>
        <p className="text-2xl font-bold">{stats?.featuredPodcasts || 0}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">Avg. Duration</h3>
        <p className="text-2xl font-bold">{stats?.averageDuration || '0:00'}</p>
      </div>
    </div>
  );
};

export default PodcastStats;