import 'iframe-resizer/js/iframeResizer.contentWindow';
import { Flex, Text } from '@chakra-ui/react';
import Feedback from '@/components/Feedback';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';

export async function getStaticProps(context) {
    const [siteId, route] = context.params.site;
    const { feedback } = await getAllFeedback(siteId, route);

    return {
        props: {
            feedback
        },
        revalidate: 1
    };
}

export async function getStaticPaths() {
    const { sites } = await getAllSites();
    const paths = sites.map((site) => ({
        params: {
            site: [site.id.toString()]
        }
    }));

    return {
        paths,
        fallback: true
    };
}

const EmbeddedFeedbackPage = ({ feedback }) => (
    <Flex direction="column" w="full">
        {feedback?.length ? (
            feedback.map((f) => <Feedback key={f.id} {...f} />)
        ) : (
            <Text>There are no comments for this site.</Text>
        )}
    </Flex>
);

export default EmbeddedFeedbackPage;
