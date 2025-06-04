-- Create a function to get all submissions (for admin use)
CREATE OR REPLACE FUNCTION get_all_submissions()
RETURNS TABLE (
    table_name TEXT,
    id UUID,
    content JSONB,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) 
SECURITY DEFINER
AS $$
BEGIN
    -- Check if user is authenticated (basic admin check)
    IF auth.role() != 'authenticated' THEN
        RAISE EXCEPTION 'Access denied. Admin access required.';
    END IF;

    -- Return depoimentos
    RETURN QUERY
    SELECT 
        'depoimentos'::TEXT as table_name,
        d.id,
        jsonb_build_object(
            'name', d.name,
            'since', d.since,
            'text', d.text,
            'photo_url', d.photo_url
        ) as content,
        d.status,
        d.created_at
    FROM depoimentos d;

    -- Return familias
    RETURN QUERY
    SELECT 
        'familias'::TEXT as table_name,
        f.id,
        jsonb_build_object(
            'name', f.name,
            'story', f.story,
            'photo_url', f.photo_url
        ) as content,
        f.status,
        f.created_at
    FROM familias f;

    -- Return memorias
    RETURN QUERY
    SELECT 
        'memorias'::TEXT as table_name,
        m.id,
        jsonb_build_object(
            'honored_name', m.honored_name,
            'submitter_name', m.submitter_name,
            'message', m.message
        ) as content,
        m.status,
        m.created_at
    FROM memorias m;
END;
$$ LANGUAGE plpgsql;

-- Create a function to approve/reject submissions
CREATE OR REPLACE FUNCTION update_submission_status(
    table_type TEXT,
    submission_id UUID,
    new_status TEXT
)
RETURNS BOOLEAN
SECURITY DEFINER
AS $$
BEGIN
    -- Check if user is authenticated (basic admin check)
    IF auth.role() != 'authenticated' THEN
        RAISE EXCEPTION 'Access denied. Admin access required.';
    END IF;

    -- Validate status
    IF new_status NOT IN ('pendente', 'aprovado', 'rejeitado') THEN
        RAISE EXCEPTION 'Invalid status. Must be pendente, aprovado, or rejeitado.';
    END IF;

    -- Update based on table type
    CASE table_type
        WHEN 'depoimentos' THEN
            UPDATE depoimentos SET status = new_status WHERE id = submission_id;
        WHEN 'familias' THEN
            UPDATE familias SET status = new_status WHERE id = submission_id;
        WHEN 'memorias' THEN
            UPDATE memorias SET status = new_status WHERE id = submission_id;
        ELSE
            RAISE EXCEPTION 'Invalid table type. Must be depoimentos, familias, or memorias.';
    END CASE;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get statistics
CREATE OR REPLACE FUNCTION get_submission_stats()
RETURNS TABLE (
    table_name TEXT,
    total_count BIGINT,
    pending_count BIGINT,
    approved_count BIGINT,
    rejected_count BIGINT
)
SECURITY DEFINER
AS $$
BEGIN
    -- Check if user is authenticated (basic admin check)
    IF auth.role() != 'authenticated' THEN
        RAISE EXCEPTION 'Access denied. Admin access required.';
    END IF;

    -- Get depoimentos stats
    RETURN QUERY
    SELECT 
        'depoimentos'::TEXT,
        COUNT(*)::BIGINT,
        COUNT(*) FILTER (WHERE status = 'pendente')::BIGINT,
        COUNT(*) FILTER (WHERE status = 'aprovado')::BIGINT,
        COUNT(*) FILTER (WHERE status = 'rejeitado')::BIGINT
    FROM depoimentos;

    -- Get familias stats
    RETURN QUERY
    SELECT 
        'familias'::TEXT,
        COUNT(*)::BIGINT,
        COUNT(*) FILTER (WHERE status = 'pendente')::BIGINT,
        COUNT(*) FILTER (WHERE status = 'aprovado')::BIGINT,
        COUNT(*) FILTER (WHERE status = 'rejeitado')::BIGINT
    FROM familias;

    -- Get memorias stats
    RETURN QUERY
    SELECT 
        'memorias'::TEXT,
        COUNT(*)::BIGINT,
        COUNT(*) FILTER (WHERE status = 'pendente')::BIGINT,
        COUNT(*) FILTER (WHERE status = 'aprovado')::BIGINT,
        COUNT(*) FILTER (WHERE status = 'rejeitado')::BIGINT
    FROM memorias;
END;
$$ LANGUAGE plpgsql;
