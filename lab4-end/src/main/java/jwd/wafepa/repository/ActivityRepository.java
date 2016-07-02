package jwd.wafepa.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jwd.wafepa.model.Activity;

@Repository
public interface ActivityRepository 
	extends JpaRepository<Activity, Long> {
	
//	@Query("select a from Activity a where a.name = :name")
//	List<Activity> findByName(@Param("name") String name);

	List<Activity> findByName(String name);
	
	@Query("delete from Activity a where a.id in :ids")
	@Modifying
	@Transactional
	void delete(@Param("ids") List<Long> ids);

}
