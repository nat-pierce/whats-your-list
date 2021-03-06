import { memo, useMemo } from 'react';
import { BarChart, Bar, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Charts.scss';
import { useContext } from 'react';
import AppContext from '../../../AppContext';
import { colorYellow } from '../../../StyleExports.module.scss';
import { HOME_TABS } from '../../../Constants';

const Charts = memo(({ favoriteMovies, areChartsDisabled }) => {
    const genreData = useMemo(() => {
        const genresDict = {};

        favoriteMovies.forEach((movie, i) => {
            const { Genres, Title } = movie;
            const scoreToAdd = 100 - i;

            Genres.forEach(genre => {
                if (!genresDict[genre]) {
                    genresDict[genre] = {
                        score: 0,
                        titles: []
                    };
                }

                const barInfo = genresDict[genre];

                barInfo.score += scoreToAdd;
                barInfo.titles.push(`#${i+1} ${Title}`);
            });
        });

        return Object.keys(genresDict).map(genre => ({
            name: genre,
            score: genresDict[genre].score,
            titles: genresDict[genre].titles
        })).sort((a, b) => b.score - a.score).slice(0, 10);
    }, [favoriteMovies]);

    const decadeData = useMemo(() => {
        const decadesDict = {};

        favoriteMovies.forEach((movie, i) => {
            const { Year, Title } = movie;
            const scoreToAdd = 100 - i;
            const decade = Math.floor(Year/10)*10

            if (!decadesDict[decade]) {
                decadesDict[decade] = {
                    score: 0,
                    titles: []
                };
            }

            const barInfo = decadesDict[decade];

            barInfo.score += scoreToAdd;
            barInfo.titles.push(`#${i+1} ${Title}`);
        });

        return Object.keys(decadesDict).map(decade => ({
            name: `${decade}s`,
            decade,
            score: decadesDict[decade].score,
            titles: decadesDict[decade].titles
        })).sort((a, b) => a.decade - b.decade);
    }, [favoriteMovies]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const displayTitles = payload[0].payload.titles.slice(0, 5);
            const numAdditionalTitles = payload[0].payload.titles.length - 5;

            return (
                <div className="custom-tooltip">
                    <div className='genre-name'>{payload[0].payload.name}</div>
                    {displayTitles.map((title, i) =>
                        <div key={`${title}_${i}`}>{title}</div>
                    )}
                    {numAdditionalTitles === 1 &&
                        <div>And {numAdditionalTitles} additional movie</div>
                    }
                    {numAdditionalTitles > 1 &&
                        <div>And {numAdditionalTitles} additional movies</div>
                    }
                </div>
            );
        }
      
        return null;
    };

    if (!favoriteMovies.length) {
        return null;
    }

    // Hardcoding axis width to center (https://github.com/recharts/recharts/issues/843)
    return (
        <div className={`charts ${areChartsDisabled ? 'disabled' : ''}`}>
            <ResponsiveContainer height="59%" className='genre-chart'>
                <BarChart data={genreData} layout='vertical'>
                    <YAxis dataKey="name" type="category" interval={0} tick={{ fill: 'black' }} width={100} />
                    <XAxis type="number" tick={false} height={0} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="score" fill={colorYellow} stroke="#000000" />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer height="40%">
                <BarChart data={decadeData} layout='vertical'>
                    <YAxis dataKey="name" type="category" interval={0} tick={{ fill: 'black' }} width={100} />
                    <XAxis type="number" tick={false} height={0} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="score" fill={colorYellow} stroke="#000000" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});

export default function ConnectedCharts({ viewListMovies }) {
    const { state } = useContext(AppContext);
    const { favoriteMovies, currentHomeTab } = state;

    // If passed movies from current viewList, use those
    const movies = viewListMovies || favoriteMovies;
    const areChartsDisabled = viewListMovies
        ? false
        : currentHomeTab === HOME_TABS.WatchLater;

    return <Charts 
        favoriteMovies={movies} 
        areChartsDisabled={areChartsDisabled}
    />;
}