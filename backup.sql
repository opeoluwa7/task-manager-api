PGDMP  3        	            }            railway    16.8 (Debian 16.8-1.pgdg120+1) #   16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)     -           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            .           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            /           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            0           1262    16384    railway    DATABASE     r   CREATE DATABASE railway WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE railway;
                postgres    false            �            1259    16389    tasks    TABLE     $  CREATE TABLE public.tasks (
    task_id integer NOT NULL,
    user_id integer,
    title character varying(255) DEFAULT 'Untitled'::character varying,
    description text DEFAULT 'Empty_text'::text,
    status text,
    priority text,
    created_at timestamp with time zone DEFAULT now(),
    deadline date,
    CONSTRAINT tasks_priority_check CHECK ((priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text]))),
    CONSTRAINT tasks_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'in_progress'::text, 'completed'::text])))
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            �            1259    16399    tasks_task_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.tasks_task_id_seq;
       public          postgres    false    215            1           0    0    tasks_task_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.tasks_task_id_seq OWNED BY public.tasks.task_id;
          public          postgres    false    216            �            1259    16400    users    TABLE     �   CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16406    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    217            2           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    218            �           2604    16407    tasks task_id    DEFAULT     n   ALTER TABLE ONLY public.tasks ALTER COLUMN task_id SET DEFAULT nextval('public.tasks_task_id_seq'::regclass);
 <   ALTER TABLE public.tasks ALTER COLUMN task_id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    16408    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    218    217            '          0    16389    tasks 
   TABLE DATA           m   COPY public.tasks (task_id, user_id, title, description, status, priority, created_at, deadline) FROM stdin;
    public          postgres    false    215   �       )          0    16400    users 
   TABLE DATA           K   COPY public.users (user_id, name, email, password, created_at) FROM stdin;
    public          postgres    false    217   �       3           0    0    tasks_task_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.tasks_task_id_seq', 28, true);
          public          postgres    false    216            4           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 8, true);
          public          postgres    false    218            �           2606    16410    tasks tasks_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (task_id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    215            �           2606    16412    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    217            �           2606    16414    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    217            �           1259    16415    idx_users_email    INDEX     I   CREATE UNIQUE INDEX idx_users_email ON public.users USING btree (email);
 #   DROP INDEX public.idx_users_email;
       public            postgres    false    217            �           2606    16416    tasks tasks_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_user_id_fkey;
       public          postgres    false    215    217    3222            '   �   x��̱
�0F�9y
wi��O�4����KZK0U(��kQ�v��9�V�؋�{䡏�rȱ�fq����swN�,@���c��r�8�{"Q�$W�$�U�'=K�$�oM`���X� Q.b��i���B�o{H��#W���Ui��1�l$�_�@�0�y%�JJ���o-      )   �  x�e��r�@�5>�w���fZET��B$u7�4�2�2h���w�I6�N����I��GE�D�Kٙg,I_nl�L�᠇`o)Qal��ނ-�%o� s���U��~f�B���b3�K$1}��	�.T�B �H��;�ܝ�u˪"H.��_NGGQ�s$ڢLk~�b��������g1��v�5��*+,u�5>�1�ca�������g��i�*E':&�pT�&�V�y{+�'II<_������ME��-�N*k���j���l���_;�c�u�����D�@�Ad@V�����x��|�K⚇騊�j4{�Y`��z����a�� ;�L���@�V��d��軨P5�����_IM�׾�U��_nˣ<WW'�>�.mc/.C�����9��c��j<w�d�d>�_��T�]�]D�TD�5���_��t�Dֻ�     