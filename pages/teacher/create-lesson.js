import { gql, useQuery, NetworkStatus, useMutation } from '@apollo/client';
import get from 'lodash.get';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Router from 'next/router';

const Editor = dynamic(() => import('components/Editor'), {
  ssr: false,
});

import {
  Flex,
  PageContent,
  Box,
  Heading,
  Text,
  Button,
  Input,
  FieldWrapper,
  Textarea,
} from 'bumbag';
import { useForm } from 'react-hook-form';
import CodeEditor from 'components/codeEditor';
import { getParamsFromUrl } from 'utils';

export const LESSON_QUERY = gql`
  query lesson($id: ID!) {
    lesson(id: $id) {
      title
      description
      content
      codeTest
      codePrecode
      codeDescription
    }
  }
`;

export const EMPTY_LESSON_QUERY = gql`
  query {
    lessons {
      id
    }
  }
`;

export const COURSE_AND_LESSON_QUERY = gql`
  query lesson($courseId: ID!, $lessonId: ID!) {
    lesson(id: $lessonId) {
      title
      description
      content
      codeTest
      codePrecode
      codeDescription
    }
    course(id: $courseId) {
      lessons {
        id
      }
    }
  }
`;

const CREATE_LESSON = gql`
  mutation createLesson(
    $title: String!
    $description: String
    $content: String
    $codeDescription: String
    $codeTest: String
    $codePrecode: String
  ) {
    createLesson(
      input: {
        data: {
          title: $title
          description: $description
          content: $content
          codeDescription: $codeDescription
          codeTest: $codeTest
          codePrecode: $codePrecode
        }
      }
    ) {
      lesson {
        id
      }
    }
  }
`;

const UPDATE_COURSE = gql`
  mutation updateCourse($lessons: [ID], $id: ID!) {
    updateCourse(input: { where: { id: $id }, data: { lessons: $lessons } }) {
      course {
        id
      }
    }
  }
`;

const UPDATE_LESSON = gql`
  mutation updateLesson(
    $title: String!
    $description: String
    $content: String
    $codeDescription: String
    $codeTest: String
    $codePrecode: String
    $id: ID!
  ) {
    updateLesson(
      input: {
        where: { id: $id }
        data: {
          title: $title
          description: $description
          content: $content
          codeDescription: $codeDescription
          codeTest: $codeTest
          codePrecode: $codePrecode
        }
      }
    ) {
      lesson {
        id
      }
    }
  }
`;

export default function CreateLesson(props) {
  const router = useRouter();

  const urlParams = getParamsFromUrl(router.asPath);
  const lessonId = urlParams.get('lessonId');
  const courseId = urlParams.get('courseId');
  // запрос за данными урока
  const { loading, error, data } = useQuery(COURSE_AND_LESSON_QUERY, {
    variables: {
      lessonId: lessonId || 'ffffffffffffffffffffffff',
      courseId: courseId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [createLesson, { data: createLessonData }] = useMutation(CREATE_LESSON);
  const [updateCourse] = useMutation(UPDATE_COURSE, {
    onCompleted: () => {
      Router.push(`/teacher/my-courses?courseId=${courseId}`);
    },
  });

  const [updateLesson] = useMutation(UPDATE_LESSON, {
    onCompleted: () => {
      Router.push(`/teacher/my-courses?courseId=${courseId}`);
    },
  });
  // хук форм
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    getValues,
  } = useForm({});

  // register components
  React.useEffect(() => {
    register({ name: 'content' }, { required: true, min: 8 });
    register({ name: 'codePrecode' });
    register({ name: 'codeTest' });
  }, []);

  const [isThereCodeExercise, setIsThereCodeExercise] = React.useState();
  React.useEffect(() => {
    setIsThereCodeExercise(get(data, 'lesson.codeTest'));
  }, [data]);

  React.useEffect(() => {
    const idLesson = get(createLessonData, 'createLesson.lesson.id');

    if (idLesson)
      updateCourse({
        variables: {
          id: courseId,
          lessons: [...data.course.lessons.map((item) => item.id), idLesson],
        },
      });
  }, [createLessonData]);

  if (error) return <div>Ошибка</div>;
  if (loading) return <div>Loading</div>;

  const { lesson, _allCoursesMeta } = data;
  const handleEditorChange = (content) => {
    setValue('content', content);
  };

  const handleCodePrecodeChange = (content) => {
    setValue('codePrecode', content);
  };

  const handleCodeTestChange = (content) => {
    setValue('codeTest', content);
  };
  const handleUpdateLesson = () => {
    updateLesson({ variables: { ...getValues(), id: lessonId } });
  };
  const handleCreateLesson = () => {
    createLesson({ variables: getValues() });
  };

  return (
    <Box>
      <Button onClick={() => console.log(getValues())}>get</Button>
      <PageContent>
        <form>
          <FieldWrapper marginBottom="major-2" label="Название урока">
            <Input
              defaultValue={get(data, 'lesson.title')}
              name="title"
              ref={register}
            />
          </FieldWrapper>
          <FieldWrapper marginBottom="major-2" label="Краткое описание урока">
            <Textarea
              defaultValue={get(data, 'lesson.description')}
              name="description"
              ref={register}
            />
          </FieldWrapper>

          <FieldWrapper marginBottom="major-2" label="Контент">
            <Editor
              content={get(data, 'lesson.content')}
              onChange={handleEditorChange}
            />
          </FieldWrapper>
          <Button
            marginBottom="major-2"
            alignX="center"
            margin="auto"
            palette="default"
            onClick={() => setIsThereCodeExercise(!isThereCodeExercise)}
          >
            {isThereCodeExercise ? 'Удалить упражнения' : 'Добавить упражнение'}
          </Button>
          {isThereCodeExercise && (
            <React.Fragment>
              <FieldWrapper marginBottom="major-2" label="Описание упражнения">
                <Textarea
                  defaultValue={get(data, 'lesson.codeDescription')}
                  name="codeDescription"
                  ref={register}
                />
              </FieldWrapper>
              <FieldWrapper
                marginBottom="major-2"
                label="Предустановленный шаблон для ученика"
              >
                <CodeEditor
                  onChange={handleCodePrecodeChange}
                  name="precode"
                  content={get(data, 'lesson.codePrecode')}
                />
              </FieldWrapper>
              <FieldWrapper
                marginBottom="major-2"
                label="Код теста для ученика"
              >
                <CodeEditor
                  onChange={handleCodeTestChange}
                  name="test"
                  content={get(data, 'lesson.codeTest')}
                />
              </FieldWrapper>
            </React.Fragment>
          )}
        </form>
        {lessonId ? (
          <Button onClick={handleUpdateLesson} width="100%" palette="primary">
            Сохранить
          </Button>
        ) : (
          <Button onClick={handleCreateLesson} width="100%" palette="primary">
            Создать урок
          </Button>
        )}
      </PageContent>
    </Box>
  );
}
